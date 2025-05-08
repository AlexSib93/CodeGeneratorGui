using BuisinessLogicLayer.Services;
using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DataAccessLayer.Dto;

namespace CodeGeneratorGUI
{    
    [Route("api/[controller]")]
    [ApiController]
    public class EnumMetadataController : ControllerBase
    {
        private IEnumMetadataService _enumMetadataService { get; set; }
        private readonly ILogger<EnumMetadataController> _logger;
        public EnumMetadataController(ILogger<EnumMetadataController> logger, IEnumMetadataService enumMetadataService)
        {
            _logger = logger;
            _enumMetadataService = enumMetadataService;
        }


        /// <summary>
        /// Создать 'Тип-перечисление'
        /// </summary>
        /// <returns></returns>
        [HttpPost("create")]
        public IActionResult Create([FromBody] EnumMetadata enumMetadata)
        {
            try
            {
                EnumMetadata res = _enumMetadataService.Add(enumMetadata);

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось создать Тип-перечисление");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

        /// <summary>
        /// Удалить сущность 'Тип-перечисление' по ID
        /// </summary>
        /// <param name="id">ID сущности</param>
        /// <returns></returns>
        [HttpPut("put")]
        public IActionResult Put([FromBody] EnumMetadata enumMetadata)
        {
            try
            {
                EnumMetadata res = _enumMetadataService.Update(enumMetadata);

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

        /// <summary>
        /// Получить сущность 'Тип-перечисление' по ID
        /// </summary>
        /// <param name="id">ID сущности</param>
        /// <returns></returns>
        [HttpGet("get")]
        public IActionResult Get(int id)
        {
            try
            {
                EnumMetadata res = _enumMetadataService.Get(p => p.IdEnumMetadata==id);

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось получить Тип-перечисление");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

        /// <summary>
        /// Получить все сущности 'Тип-перечисление' 
        /// </summary>
        /// <returns></returns>
        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            try
            {
                IEnumerable<EnumMetadata> res = _enumMetadataService.GetAll();

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось получить все Тип-перечисление");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

        /// <summary>
        /// Удалить сущность 'Тип-перечисление' по ID
        /// </summary>
        /// <param name="id">ID сущности</param>
        /// <returns></returns>
        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {
            try
            {
                _enumMetadataService.Delete(id);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось удалить Тип-перечисление");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

    }
}
