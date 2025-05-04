using BuisinessLogicLayer.Services;
using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CodeGenerator.Services;
using CodeGenerator;
using CodeGenerator.Metadata;
using System.Diagnostics;
namespace CodeGeneratorGUI
{    
    [Route("api/[controller]")]
    [ApiController]
    public class GeneratorController : ControllerBase
    {
        private readonly ILogger<GeneratorController> _logger;
        public GeneratorController(ILogger<GeneratorController> logger)
        {
            _logger = logger;
        }


        /// <summary>
        /// Сгенерировать код проекта
        /// </summary>
        /// <returns></returns>
        [HttpPost("GenProject")]
        public IActionResult GenProject(string name)
        {
            try
            {
                var mngr = new ProjectFileManager("./projects");
                ProjectMetadata project = mngr.LoadProject<ProjectMetadata>(name);

                Settings.TemplatesPath = @".\Templates";
                Generator generator = new Generator();
                generator.GenCode(project);

                return Ok("Проект успешно сгенерирован");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось сгенерировать проект");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

        /// <summary>
        /// Сгенерировать метаданные форм проекта
        /// </summary>
        /// <returns></returns>
        [HttpPost("GenProjectFormMetadata")]
        public IActionResult GenProjectFormMetadata(string name)
        {
            try
            {
                var mngr = new ProjectFileManager("./projects");
                ProjectMetadata project = mngr.LoadProject<ProjectMetadata>(name);
                project.Forms = MetadataHelper.AutoCreateFormMetadata(project);

                mngr.SaveProject(project.Name, project);

                return Ok(project);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось сгенерировать проект");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }


        /// <summary>
        /// Сгенерировать код проекта
        /// </summary>
        /// <returns></returns>
        [HttpPost("RunProject")]
        public IActionResult RunProject(string name)
        {
            try
            {
                var mngr = new ProjectFileManager("./projects");
                ProjectMetadata project = mngr.LoadProject<ProjectMetadata>(name);

                ProjectRunner.RunProject(project); 

                return Ok("Проект успешно запущен");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось сгенерировать проект");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }

    }
}
