using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using DataAccessLayer;
using DataAccessLayer.Dto;

namespace BuisinessLogicLayer.Services
{
    public interface IProjectMetadataService
    {

        ProjectMetadata Add(ProjectMetadata projectMetadata);

        ProjectMetadata Update(ProjectMetadata projectMetadata); 

        IEnumerable<ProjectMetadata> Update(IEnumerable<ProjectMetadata> projectMetadatas);

        ProjectMetadata Get(Expression<Func<ProjectMetadata, bool>> where = null);

        IEnumerable<ProjectMetadata> GetAll(Expression<Func<ProjectMetadata, bool>> where = null);


        void Delete(int id);
    }
}
