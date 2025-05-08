using System;
using DataAccessLayer.Dto;

namespace DataAccessLayer
{
    public interface IUnitOfWork : IDisposable
    {

        IRepository<ModelMetadata> RepModelMetadata { get;}

        IRepository<ProjectMetadata> RepProjectMetadata { get;}

        IRepository<FormMetadata> RepFormMetadata { get;}

        IRepository<PropMetadata> RepPropMetadata { get;}

        IRepository<ComponentMetadata> RepComponentMetadata { get;}

        IRepository<EnumMetadata> RepEnumMetadata { get;}

        IRepository<EnumValueMetadata> RepEnumValueMetadata { get;}

        IRepository<User> RepUser { get;}


    }
}
