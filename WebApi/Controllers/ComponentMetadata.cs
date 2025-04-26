using BuisinessLogicLayer.Services;
using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DataAccessLayer.Dto;

namespace CodeGeneratorGUI
{    
    [Route("api/[controller]")]
    [ApiController]
    public class ComponentMetadataController : ControllerBase
    {
        private IComponentMetadataService _componentMetadataService { get; set; }
        private readonly ILogger<ComponentMetadataController> _logger;
        public ComponentMetadataController(ILogger<ComponentMetadataController> logger, IComponentMetadataService componentMetadataService)
        {
            _logger = logger;
            _componentMetadataService = componentMetadataService;
        }


        /// <summary>
        /// Создать 'Компонент формы'
        /// </summary>
        /// <returns></returns>
        [HttpPost("create")]
        public IActionResult Create([FromBody] ComponentMetadata componentMetadata)
        {
            try
            {
                ComponentMetadata res = _componentMetadataService.Add(componentMetadata);

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось создать Компонент формы");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

        /// <summary>
        /// Удалить сущность 'Компонент формы' по ID
        /// </summary>
        /// <param name="id">ID сущности</param>
        /// <returns></returns>
        [HttpPut("put")]
        public IActionResult Put([FromBody] ComponentMetadata componentMetadata)
        {
            try
            {
                ComponentMetadata res = _componentMetadataService.Update(componentMetadata);

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

        /// <summary>
        /// Получить сущность 'Компонент формы' по ID
        /// </summary>
        /// <param name="id">ID сущности</param>
        /// <returns></returns>
        [HttpGet("get")]
        public IActionResult Get(int id)
        {
            try
            {
                ComponentMetadata res = _componentMetadataService.Get(p => p.IdComponentMetadata==id);

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось получить Компонент формы");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

        /// <summary>
        /// Получить все сущности 'Компонент формы' 
        /// </summary>
        /// <returns></returns>
        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            try
            {
                IEnumerable<ComponentMetadata> res = _componentMetadataService.GetAll();

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось получить все Компонент формы");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

        /// <summary>
        /// Удалить сущность 'Компонент формы' по ID
        /// </summary>
        /// <param name="id">ID сущности</param>
        /// <returns></returns>
        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {
            try
            {
                _componentMetadataService.Delete(id);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось удалить Компонент формы");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

    }
}
