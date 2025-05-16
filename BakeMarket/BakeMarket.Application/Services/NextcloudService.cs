using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebDav;

namespace BakeMarket.Application.Services
{
    public class NextcloudService
    {
        private readonly WebDavClient _client;
        private readonly string _baseUrl;
        private readonly string _projectName;

        public NextcloudService(string serverUrl, string username, string password, string projectName)
        {
            _baseUrl = $"{serverUrl}/remote.php/dav/files/{username}/";
            _projectName = projectName;

            var httpClient = new HttpClient();
            var credentials = Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes($"{username}:{password}"));
            httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", credentials);

            _client = new WebDavClient(httpClient);

            // Đảm bảo thư mục project đã được tạo
            EnsureProjectFolderExistsAsync().GetAwaiter().GetResult();
        }

        // Phương thức đảm bảo thư mục project tồn tại
        private async Task EnsureProjectFolderExistsAsync()
        {
            try
            {
                var propFind = await _client.Propfind(_baseUrl + _projectName);
                if (!propFind.IsSuccessful)
                {
                    await _client.Mkcol(_baseUrl + _projectName);
                }
            }
            catch
            {
                await _client.Mkcol(_baseUrl + _projectName);
            }
        }

        // Phương thức tạo thư mục con trong thư mục project
        public async Task<bool> CreateFolderAsync(string folderName)
        {
            try
            {
                string folderPath = Path.Combine(_projectName, folderName).Replace("\\", "/");
                var result = await _client.Mkcol(_baseUrl + folderPath);
                return result.IsSuccessful;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating folder: {ex.Message}");
                return false;
            }
        }

        // Phương thức để tải ảnh lên Nextcloud với tùy chọn thư mục
        public async Task<string> UploadImageAsync(string localFilePath, string fileName, string subFolder = "")
        {
            try
            {
                // Kiểm tra và tạo thư mục con nếu cần
                string remoteFolderPath = _projectName;
                if (!string.IsNullOrEmpty(subFolder))
                {
                    remoteFolderPath = Path.Combine(_projectName, subFolder).Replace("\\", "/");
                    await EnsureFolderExistsAsync(remoteFolderPath);
                }

                string remoteFilePath = Path.Combine(remoteFolderPath, fileName).Replace("\\", "/");

                using (var fileStream = File.OpenRead(localFilePath))
                {
                    var uploadResult = await _client.PutFile(
                        _baseUrl + remoteFilePath,
                        fileStream);

                    if (uploadResult.IsSuccessful)
                        return remoteFilePath;

                    return null;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error uploading file: {ex.Message}");
                return null;
            }
        }

        // Đảm bảo thư mục tồn tại
        private async Task EnsureFolderExistsAsync(string folderPath)
        {
            try
            {
                var propFind = await _client.Propfind(_baseUrl + folderPath);
                if (!propFind.IsSuccessful)
                {
                    // Tạo từng cấp thư mục nếu cần
                    string[] folders = folderPath.Split('/');
                    string currentPath = "";
                    foreach (var folder in folders)
                    {
                        if (string.IsNullOrEmpty(folder)) continue;

                        currentPath = string.IsNullOrEmpty(currentPath) ? folder : currentPath + "/" + folder;

                        var checkFolder = await _client.Propfind(_baseUrl + currentPath);
                        if (!checkFolder.IsSuccessful)
                        {
                            await _client.Mkcol(_baseUrl + currentPath);
                        }
                    }
                }
            }
            catch
            {
                // Tạo từng cấp thư mục nếu có lỗi
                string[] folders = folderPath.Split('/');
                string currentPath = "";
                foreach (var folder in folders)
                {
                    if (string.IsNullOrEmpty(folder)) continue;

                    currentPath = string.IsNullOrEmpty(currentPath) ? folder : currentPath + "/" + folder;

                    try
                    {
                        var checkFolder = await _client.Propfind(_baseUrl + currentPath);
                        if (!checkFolder.IsSuccessful)
                        {
                            await _client.Mkcol(_baseUrl + currentPath);
                        }
                    }
                    catch
                    {
                        await _client.Mkcol(_baseUrl + currentPath);
                    }
                }
            }
        }

        // Phương thức để tải ảnh từ Nextcloud
        public async Task<Stream> DownloadImageAsync(string remoteFilePath)
        {
            try
            {
                // Nếu đường dẫn không bắt đầu bằng tên project, thêm vào
                if (!remoteFilePath.StartsWith(_projectName))
                {
                    remoteFilePath = Path.Combine(_projectName, remoteFilePath).Replace("\\", "/");
                }

                var result = await _client.GetRawFile(_baseUrl + remoteFilePath);

                if (result.IsSuccessful)
                {
                    return result.Stream;
                }

                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error downloading file: {ex.Message}");
                return null;
            }
        }

        // Phương thức để kiểm tra xem file có tồn tại không
        public async Task<bool> FileExistsAsync(string remoteFilePath)
        {
            try
            {
                // Nếu đường dẫn không bắt đầu bằng tên project, thêm vào
                if (!remoteFilePath.StartsWith(_projectName))
                {
                    remoteFilePath = Path.Combine(_projectName, remoteFilePath).Replace("\\", "/");
                }

                var propFind = await _client.Propfind(_baseUrl + remoteFilePath);
                return propFind.IsSuccessful;
            }
            catch
            {
                return false;
            }
        }

        // Phương thức để xóa ảnh
        public async Task<bool> DeleteImageAsync(string remoteFilePath)
        {
            try
            {
                // Nếu đường dẫn không bắt đầu bằng tên project, thêm vào
                if (!remoteFilePath.StartsWith(_projectName))
                {
                    remoteFilePath = Path.Combine(_projectName, remoteFilePath).Replace("\\", "/");
                }

                var deleteResult = await _client.Delete(_baseUrl + remoteFilePath);
                return deleteResult.IsSuccessful;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting file: {ex.Message}");
                return false;
            }
        }
    }
}
