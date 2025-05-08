using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Newtonsoft.Json;
using DataAccessLayer;
using DataAccessLayer.Dto;
using System.Linq;

namespace BuisinessLogicLayer.Services
{
    public class ProjectMetadataService : BaseService, IProjectMetadataService
    {
         public IModelMetadataService ModelMetadataService { get; set; }
         public IFormMetadataService FormMetadataService { get; set; }
         public IEnumMetadataService EnumMetadataService { get; set; }

        public ProjectMetadataService(IUnitOfWork unit, IModelMetadataService modelMetadataService, IFormMetadataService formMetadataService, IEnumMetadataService enumMetadataService) : base(unit)
        {
          ModelMetadataService = modelMetadataService;
          FormMetadataService = formMetadataService;
          EnumMetadataService = enumMetadataService;

        }

        public ProjectMetadata Add(ProjectMetadata projectMetadata)
        {
            Unit.RepProjectMetadata.Add(projectMetadata);

            return projectMetadata;
        }

        public ProjectMetadata Update(ProjectMetadata projectMetadata)
        {
              ModelMetadataService.Update( projectMetadata.IdProjectMetadata, projectMetadata.Models);
              FormMetadataService.Update( projectMetadata.IdProjectMetadata, projectMetadata.Forms);
              EnumMetadataService.Update( projectMetadata.IdProjectMetadata, projectMetadata.EnumTypes);
            int res = Unit.RepProjectMetadata.Update(projectMetadata);

            return projectMetadata;
        }

        public IEnumerable<ProjectMetadata> Update(IEnumerable<ProjectMetadata> projectMetadatas)
        {
            foreach(ProjectMetadata item in projectMetadatas)
            {              ModelMetadataService.Update( item.Models);
              FormMetadataService.Update( item.Forms);
              EnumMetadataService.Update( item.EnumTypes);

            }

            int res = Unit.RepProjectMetadata.Update(projectMetadatas);

            return projectMetadatas;
        }

        public IEnumerable<ProjectMetadata> Add(IEnumerable<ProjectMetadata> projectMetadata)
        {
            Unit.RepProjectMetadata.Add(projectMetadata);

            return projectMetadata;
        }

        public ProjectMetadata Get(Expression<Func<ProjectMetadata, bool>> where = null)
        {
            ProjectMetadata t = Unit.RepProjectMetadata.Get(where, "Models", "Forms", "Forms.EditForm", "Forms.Model", "EnumTypes");

            return t;
        }

        public IEnumerable<ProjectMetadata> GetAll(Expression<Func<ProjectMetadata, bool>> where = null)
        {
            IEnumerable<ProjectMetadata> projectMetadatas = Unit.RepProjectMetadata.GetAll(where);

            return projectMetadatas;
        }


        public void Delete(int id)
        {
            ProjectMetadata t = Unit.RepProjectMetadata.Get(p => p.IdProjectMetadata==id);
            Unit.RepProjectMetadata.Delete(t);
        }
    }
}
