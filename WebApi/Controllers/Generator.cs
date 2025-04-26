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

                Process hostApiProcess = BuildAndRunWebApi(project);
                Process hostClientProcess = BuildAndRunClient(project, true);

                hostClientProcess.WaitForExit();
                hostApiProcess.WaitForExit();

                hostClientProcess.Kill();
                hostApiProcess.Kill();


                return Ok("Проект успешно сгенерирован");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось сгенерировать проект");
                return BadRequest(ex.Message + " " + ex.InnerException?.Message);
            }
        }
        private Process BuildAndRunWebApi(ProjectMetadata project)
        {
            string webApiPath = $@"{project.Path}\WebApi\";
            bool useCmdWindow = true;
            Process process = RunCommand("dotnet", "run", webApiPath, useCmdWindow, false);

            return process;
        }
        private static Process RunCommand(string fileName, string args, string workDirrectory, bool useCmdWindow, bool waitForExit = true)
        {
            Process process = new Process();

            process.StartInfo.FileName = fileName; // Используем команду dotnet
            process.StartInfo.Arguments = args; // Используем команду run для запуска проекта .NET Core или .NET 5+
            process.StartInfo.WorkingDirectory = workDirrectory;
            process.StartInfo.UseShellExecute = useCmdWindow; // Это нужно, чтобы скрыть окно командной строки (если не требуется отображение)
            process.StartInfo.RedirectStandardOutput = !useCmdWindow; // Указываем, что хотим перехватить вывод командной строки
            process.StartInfo.CreateNoWindow = !useCmdWindow; // Скрываем окно командной строки

            // Запускаем процесс
            process.Start();

            if (!useCmdWindow)
            {
                string output = process.StandardOutput.ReadToEnd();
                Console.WriteLine(output);
            }

            if (waitForExit)
            {
                process.WaitForExit();
            }

            return process;
        }

        private Process BuildAndRunClient(ProjectMetadata project, bool useCmdWindow = true)
        {
            string workDirrectory = $@"{project.Path}\ReactRedux";

            Process process = RunCommand("npm", "i", workDirrectory, useCmdWindow);
            process.Kill();
            process.Dispose();

            Process process2 = RunCommand("npm", "start", workDirrectory, useCmdWindow, false);

            return process2;
        }
    }
}
