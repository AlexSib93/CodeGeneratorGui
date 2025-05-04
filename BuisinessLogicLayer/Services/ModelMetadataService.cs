using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Newtonsoft.Json;
using DataAccessLayer;
using DataAccessLayer.Dto;
using System.Linq;

namespace BuisinessLogicLayer.Services
{
    public class ModelMetadataService : BaseService, IModelMetadataService
    {
         public IPropMetadataService PropMetadataService { get; set; }

        public ModelMetadataService(IUnitOfWork unit, IPropMetadataService propMetadataService) : base(unit)
        {
          PropMetadataService = propMetadataService;
Add(JsonConvert.DeserializeObject<IEnumerable<ModelMetadata>>(@"[
  {
    ""Name"": ""ModelMetadata"",
    ""NameSpace"": ""CodeGeneratorGUI"",
    ""Caption"": ""Модель"",
    ""Props"": [
      {
        ""Name"": ""Name"",
        ""Type"": ""string"",
        ""Caption"": ""Имя""
      },
      {
        ""Name"": ""Description"",
        ""Type"": ""string"",
        ""Caption"": ""Описание""
      },
      {
        ""Name"": ""Id"",
        ""Type"": ""int"",
        ""Caption"": ""Идентификатор""
      }
    ]
  },
  {
    ""Name"": ""ProjectMetadata"",
    ""NameSpace"": ""CodeGeneratorGUI"",
    ""Caption"": ""Проект"",
    ""Props"": null
  },
  {
    ""Name"": ""FormMetadata"",
    ""NameSpace"": ""CodeGeneratorGUI"",
    ""Caption"": ""Форма"",
    ""Props"": null
  }
]"));
        }

        public ModelMetadata Add(ModelMetadata modelMetadata)
        {
            Unit.RepModelMetadata.Add(modelMetadata);

            return modelMetadata;
        }

        public ModelMetadata Update(ModelMetadata modelMetadata)
        {
              PropMetadataService.Update( modelMetadata.IdModelMetadata, modelMetadata.Props);
            int res = Unit.RepModelMetadata.Update(modelMetadata);

            return modelMetadata;
        }

        public IEnumerable<ModelMetadata> Update(IEnumerable<ModelMetadata> modelMetadatas)
        {
            foreach(ModelMetadata item in modelMetadatas)
            {              PropMetadataService.Update( item.Props);

            }

            int res = Unit.RepModelMetadata.Update(modelMetadatas);

            return modelMetadatas;
        }

        public IEnumerable<ModelMetadata> Update(int idMaster, IEnumerable<ModelMetadata> modelMetadatas)
        {
            IEnumerable<int> existedIds = Unit.RepModelMetadata.GetIds(i => i.IdProjectMetadata == idMaster, i => i.IdModelMetadata);
            
            foreach (ModelMetadata item in modelMetadatas)
            {
                if (existedIds.Any(c => c == item.IdModelMetadata))
                {
                    Update(item);
                }
                else
                {
                    Add(item);
                }
            }

            foreach (int existedId in existedIds)
            {
                if (!modelMetadatas.Any(c => c.IdModelMetadata == existedId))
                {
                    Delete(existedId);
                }
            }

            return modelMetadatas;
        }

        public IEnumerable<ModelMetadata> Add(IEnumerable<ModelMetadata> modelMetadata)
        {
            Unit.RepModelMetadata.Add(modelMetadata);

            return modelMetadata;
        }

        public ModelMetadata Get(Expression<Func<ModelMetadata, bool>> where = null)
        {
            ModelMetadata t = Unit.RepModelMetadata.Get(where, "Props", "ProjectMetadata");

            return t;
        }

        public IEnumerable<ModelMetadata> GetAll(Expression<Func<ModelMetadata, bool>> where = null)
        {
            IEnumerable<ModelMetadata> modelMetadatas = Unit.RepModelMetadata.GetAll(where,"ProjectMetadata");

            return modelMetadatas;
        }

        public IEnumerable<ModelMetadata> GetByMaster(int idMaster)
        {
            IEnumerable<ModelMetadata> modelMetadatas = Unit.RepModelMetadata.GetAll( x => x.IdProjectMetadata == idMaster, "ProjectMetadata");

            return modelMetadatas;
        }


        public void Delete(int id)
        {
            ModelMetadata t = Unit.RepModelMetadata.Get(p => p.IdModelMetadata==id);
            Unit.RepModelMetadata.Delete(t);
        }
    }
}
