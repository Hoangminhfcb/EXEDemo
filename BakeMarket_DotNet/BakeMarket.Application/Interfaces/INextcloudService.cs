using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Application.Interfaces
{
    public interface INextcloudService
    {
        Task EnsureProjectFolderExistsAsync();
        Task<bool> CreateFolderAsync(string folderName);
        Task<string> UploadImageAsync(string localFilePath, string fileName, string subFolder = "");
        Task EnsureFolderExistsAsync(string folderPath);
        Task<Stream> DownloadImageAsync(string remoteFilePath);
        Task<bool> FileExistsAsync(string remoteFilePath);
        Task<bool> DeleteImageAsync(string remoteFilePath);
    }
}
