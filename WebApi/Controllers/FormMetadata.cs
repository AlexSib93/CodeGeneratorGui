using BuisinessLogicLayer.Services;
using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DataAccessLayer.Dto;

namespace CodeGeneratorGUI
{    
    [Route("api/[controller]")]
    [ApiController]
    public class FormMetadataController : ControllerBase
    {
        private IFormMetadataService _formMetadataService { get; set; }
        private readonly ILogger<FormMetadataController> _logger;
        public FormMetadataController(ILogger<FormMetadataController> logger, IFormMetadataService formMetadataService)
        {
            _logger = logger;
            _formMetadataService = formMetadataService;
        }


        /// <summary>
        /// Создать 'Форма'
        /// </summary>
        /// <returns></returns>
        [HttpPost("create")]
        public IActionResult Create([FromBody] FormMetadata formMetadata)
        {
            try
            {
                FormMetadata res = _formMetadataService.Add(formMetadata);

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось создать Форма");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

        /// <summary>
        /// Удалить сущность 'Форма' по ID
        /// </summary>
        /// <param name="id">ID сущности</param>
        /// <returns></returns>
        [HttpPut("put")]
        public IActionResult Put([FromBody] FormMetadata formMetadata)
        {
            try
            {
                FormMetadata res = _formMetadataService.Update(formMetadata);

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

        /// <summary>
        /// Получить сущность 'Форма' по ID
        /// </summary>
        /// <param name="id">ID сущности</param>
        /// <returns></returns>
        [HttpGet("get")]
        public IActionResult Get(int id)
        {
            try
            {
                FormMetadata res = _formMetadataService.Get(p => p.IdFormMetadata==id);

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось получить Форма");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

        /// <summary>
        /// Получить все сущности 'Форма' 
        /// </summary>
        /// <returns></returns>
        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            try
            {
                IEnumerable<FormMetadata> res = _formMetadataService.GetAll();

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось получить все Форма");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

        /// <summary>
        /// Удалить сущность 'Форма' по ID
        /// </summary>
        /// <param name="id">ID сущности</param>
        /// <returns></returns>
        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {
            try
            {
                _formMetadataService.Delete(id);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось удалить Форма");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

    }
}
