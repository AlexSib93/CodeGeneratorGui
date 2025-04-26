using BuisinessLogicLayer.Services;
using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DataAccessLayer.Dto;
using CodeGenerator.Services;
namespace CodeGeneratorGUI
{    
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectMetadataController : ControllerBase
    {
        private IProjectMetadataService _projectMetadataService { get; set; }
        private readonly ILogger<ProjectMetadataController> _logger;
        public ProjectMetadataController(ILogger<ProjectMetadataController> logger, IProjectMetadataService projectMetadataService)
        {
            _logger = logger;
            _projectMetadataService = projectMetadataService;
        }


        /// <summary>
        /// Создать 'Проект'
        /// </summary>
        /// <returns></returns>
        [HttpPost("create")]
        public IActionResult Create([FromBody] ProjectMetadata projectMetadata)
        {
            try
            {
                ProjectMetadata res = _projectMetadataService.Add(projectMetadata);

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось создать Проект");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

        /// <summary>
        /// Удалить сущность 'Проект' по ID
        /// </summary>
        /// <param name="id">ID сущности</param>
        /// <returns></returns>
        [HttpPut("put")]
        public IActionResult Put([FromBody] ProjectMetadata projectMetadata)
        {
            try
            {
                ProjectMetadata res = _projectMetadataService.Update(projectMetadata);

                var mngr = new ProjectFileManager("./projects");

                mngr.SaveProject(projectMetadata.Name, projectMetadata);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

        /// <summary>
        /// Получить сущность 'Проект' по ID
        /// </summary>
        /// <param name="id">ID сущности</param>
        /// <returns></returns>
        [HttpGet("get")]
        public IActionResult Get(int id)
        {
            try
            {
                ProjectMetadata res = _projectMetadataService.Get(p => p.IdProjectMetadata==id);

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось получить Проект");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

        /// <summary>
        /// Получить все сущности 'Проект' 
        /// </summary>
        /// <returns></returns>
        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            try
            {
                //IEnumerable<ProjectMetadata> res = _projectMetadataService.GetAll();

                var mngr = new ProjectFileManager("./projects");
                List<ProjectMetadata> list = mngr.GetProjects<ProjectMetadata>();

                return Ok(list);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось получить все Проект");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

        /// <summary>
        /// Удалить сущность 'Проект' по ID
        /// </summary>
        /// <param name="id">ID сущности</param>
        /// <returns></returns>
        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {
            try
            {
                _projectMetadataService.Delete(id);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось удалить Проект");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

    }
}
