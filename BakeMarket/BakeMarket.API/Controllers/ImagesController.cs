using BakeMarket.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BakeMarket.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly NextcloudService _nextcloudService;

        public ImagesController(NextcloudService nextcloudService)
        {
            _nextcloudService = nextcloudService;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage(IFormFile file, [FromForm] string subFolder = "")
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded");

            try
            {
                // Tạo tên file độc nhất
                string fileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";

                // Lưu file tạm thời
                var tempPath = Path.GetTempFileName();
                using (var stream = new FileStream(tempPath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Tải lên Nextcloud
                var remoteFilePath = await _nextcloudService.UploadImageAsync(tempPath, fileName, subFolder);

                // Xóa file tạm
                System.IO.File.Delete(tempPath);

                if (remoteFilePath != null)
                    return Ok(new { filePath = remoteFilePath });
                else
                    return StatusCode(500, "Failed to upload file");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("file/{*filePath}")]
        public async Task<IActionResult> GetImage(string filePath)
        {
            try
            {
                var exists = await _nextcloudService.FileExistsAsync(filePath);
                if (!exists)
                    return NotFound("Image not found");

                var imageStream = await _nextcloudService.DownloadImageAsync(filePath);
                if (imageStream == null)
                    return StatusCode(500, "Failed to download image");

                // Lấy loại MIME dựa trên phần mở rộng
                string contentType = GetContentType(filePath);

                return File(imageStream, contentType);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("file/{*filePath}")]
        public async Task<IActionResult> DeleteImage(string filePath)
        {
            try
            {
                var result = await _nextcloudService.DeleteImageAsync(filePath);
                if (result)
                    return Ok("File deleted successfully");
                else
                    return StatusCode(500, "Failed to delete file");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("folder")]
        public async Task<IActionResult> CreateFolder([FromBody] CreateFolderRequest request)
        {
            if (string.IsNullOrEmpty(request.FolderName))
                return BadRequest("Folder name is required");

            try
            {
                var result = await _nextcloudService.CreateFolderAsync(request.FolderName);
                if (result)
                    return Ok(new { message = "Folder created successfully" });
                else
                    return StatusCode(500, "Failed to create folder");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        private string GetContentType(string fileName)
        {
            var ext = Path.GetExtension(fileName).ToLowerInvariant();
            return ext switch
            {
                ".jpg" or ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".gif" => "image/gif",
                ".bmp" => "image/bmp",
                ".webp" => "image/webp",
                _ => "application/octet-stream"
            };
        }
    }
    public class CreateFolderRequest
    {
        public string FolderName { get; set; }
    }
}
