using BuisinessLogicLayer.Services;
using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DataAccessLayer.Dto;

namespace CodeGeneratorGUI
{    
    [Route("api/[controller]")]
    [ApiController]
    public class ModelMetadataController : ControllerBase
    {
        private IModelMetadataService _modelMetadataService { get; set; }
        private readonly ILogger<ModelMetadataController> _logger;
        public ModelMetadataController(ILogger<ModelMetadataController> logger, IModelMetadataService modelMetadataService)
        {
            _logger = logger;
            _modelMetadataService = modelMetadataService;
        }


        /// <summary>
        /// Создать 'Модель'
        /// </summary>
        /// <returns></returns>
        [HttpPost("create")]
        public IActionResult Create([FromBody] ModelMetadata modelMetadata)
        {
            try
            {
                ModelMetadata res = _modelMetadataService.Add(modelMetadata);

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось создать Модель");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

        /// <summary>
        /// Удалить сущность 'Модель' по ID
        /// </summary>
        /// <param name="id">ID сущности</param>
        /// <returns></returns>
        [HttpPut("put")]
        public IActionResult Put([FromBody] ModelMetadata modelMetadata)
        {
            try
            {
                ModelMetadata res = _modelMetadataService.Update(modelMetadata);

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

        /// <summary>
        /// Получить сущность 'Модель' по ID
        /// </summary>
        /// <param name="id">ID сущности</param>
        /// <returns></returns>
        [HttpGet("get")]
        public IActionResult Get(int id)
        {
            try
            {
                ModelMetadata res = _modelMetadataService.Get(p => p.IdModelMetadata==id);

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось получить Модель");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

        /// <summary>
        /// Получить все сущности 'Модель' 
        /// </summary>
        /// <returns></returns>
        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            try
            {
                IEnumerable<ModelMetadata> res = _modelMetadataService.GetAll();

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось получить все Модель");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

        /// <summary>
        /// Удалить сущность 'Модель' по ID
        /// </summary>
        /// <param name="id">ID сущности</param>
        /// <returns></returns>
        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {
            try
            {
                _modelMetadataService.Delete(id);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось удалить Модель");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

    }
}
