using BuisinessLogicLayer.Services;
using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DataAccessLayer.Dto;

namespace CodeGeneratorGUI
{    
    [Route("api/[controller]")]
    [ApiController]
    public class EnumValueMetadataController : ControllerBase
    {
        private IEnumValueMetadataService _enumValueMetadataService { get; set; }
        private readonly ILogger<EnumValueMetadataController> _logger;
        public EnumValueMetadataController(ILogger<EnumValueMetadataController> logger, IEnumValueMetadataService enumValueMetadataService)
        {
            _logger = logger;
            _enumValueMetadataService = enumValueMetadataService;
        }


        /// <summary>
        /// Создать 'Значение типа-перечисления'
        /// </summary>
        /// <returns></returns>
        [HttpPost("create")]
        public IActionResult Create([FromBody] EnumValueMetadata enumValueMetadata)
        {
            try
            {
                EnumValueMetadata res = _enumValueMetadataService.Add(enumValueMetadata);

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось создать Значение типа-перечисления");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

        /// <summary>
        /// Удалить сущность 'Значение типа-перечисления' по ID
        /// </summary>
        /// <param name="id">ID сущности</param>
        /// <returns></returns>
        [HttpPut("put")]
        public IActionResult Put([FromBody] EnumValueMetadata enumValueMetadata)
        {
            try
            {
                EnumValueMetadata res = _enumValueMetadataService.Update(enumValueMetadata);

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

        /// <summary>
        /// Получить сущность 'Значение типа-перечисления' по ID
        /// </summary>
        /// <param name="id">ID сущности</param>
        /// <returns></returns>
        [HttpGet("get")]
        public IActionResult Get(int id)
        {
            try
            {
                EnumValueMetadata res = _enumValueMetadataService.Get(p => p.IdEnumValueMetadata==id);

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось получить Значение типа-перечисления");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

        /// <summary>
        /// Получить все сущности 'Значение типа-перечисления' 
        /// </summary>
        /// <returns></returns>
        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            try
            {
                IEnumerable<EnumValueMetadata> res = _enumValueMetadataService.GetAll();

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось получить все Значение типа-перечисления");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

        /// <summary>
        /// Удалить сущность 'Значение типа-перечисления' по ID
        /// </summary>
        /// <param name="id">ID сущности</param>
        /// <returns></returns>
        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {
            try
            {
                _enumValueMetadataService.Delete(id);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось удалить Значение типа-перечисления");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

    }
}
