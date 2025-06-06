﻿using System.Data;
using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System.Reflection;
using Microsoft.EntityFrameworkCore.Infrastructure;
using DataAccessLayer.Dto;

namespace DataAccessLayer.Data
{
    public class EfUnit : IUnitOfWork, IDisposable
    {
        private bool _disposed = false;

        private DataBaseContext _db;
        private IDbContextTransaction _trans;


        private IRepository<User> _repUser;
        public IRepository<User> RepUser
        {
            get { return _repUser ?? (_repUser = new DataBaseRepository<User>(_db)); }
        }
        private IRepository<ModelMetadata> _repModelMetadata;
        public IRepository<ModelMetadata> RepModelMetadata
        {
            get { return _repModelMetadata ?? (_repModelMetadata = new DataBaseRepository<ModelMetadata>(_db)); }
        }

        private IRepository<ProjectMetadata> _repProjectMetadata;
        public IRepository<ProjectMetadata> RepProjectMetadata
        {
            get { return _repProjectMetadata ?? (_repProjectMetadata = new DataBaseRepository<ProjectMetadata>(_db)); }
        }

        private IRepository<FormMetadata> _repFormMetadata;
        public IRepository<FormMetadata> RepFormMetadata
        {
            get { return _repFormMetadata ?? (_repFormMetadata = new DataBaseRepository<FormMetadata>(_db)); }
        }

        private IRepository<PropMetadata> _repPropMetadata;
        public IRepository<PropMetadata> RepPropMetadata
        {
            get { return _repPropMetadata ?? (_repPropMetadata = new DataBaseRepository<PropMetadata>(_db)); }
        }

        private IRepository<ComponentMetadata> _repComponentMetadata;
        public IRepository<ComponentMetadata> RepComponentMetadata
        {
            get { return _repComponentMetadata ?? (_repComponentMetadata = new DataBaseRepository<ComponentMetadata>(_db)); }
        }

        private IRepository<EnumMetadata> _repEnumMetadata;
        public IRepository<EnumMetadata> RepEnumMetadata
        {
            get { return _repEnumMetadata ?? (_repEnumMetadata = new DataBaseRepository<EnumMetadata>(_db)); }
        }

        private IRepository<EnumValueMetadata> _repEnumValueMetadata;
        public IRepository<EnumValueMetadata> RepEnumValueMetadata
        {
            get { return _repEnumValueMetadata ?? (_repEnumValueMetadata = new DataBaseRepository<EnumValueMetadata>(_db)); }
        }



        public EfUnit(DataBaseContext db)
        {
            _db = db;
        }

        public EfUnit(string connectionString)
        {
            _db = new DataBaseContext(connectionString);
        }

        public virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _db.Dispose();
                }
                _disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public DataBaseContext GetDbContext()
        {
            return _db;
        }

        public List<T> SqlQuery<T>(string query) where T : class, new()
        {
            return SqlQuery<T>(query, null);
        }

        public List<T> SqlQuery<T>(string query, params DbParameter[] prms) where T : class, new()
        {
            DataBaseContext db = GetDbContext();

            using (var command = db.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = query;
                command.CommandType = CommandType.Text;

                command.Parameters.Clear();
                if (prms != null)
                {
                    foreach (var param in prms)
                    {
                        command.Parameters.Add(param);
                    }
                }

                db.Database.OpenConnection();
                using (var reader = command.ExecuteReader())
                {
                    var lst = new List<T>();
                    var lstColumns = new T().GetType().GetProperties(BindingFlags.DeclaredOnly | BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic).ToList();
                    while (reader.Read())
                    {
                        var newObject = new T();
                        for (var i = 0; i < reader.FieldCount; i++)
                        {
                            var name = reader.GetName(i);
                            PropertyInfo prop = lstColumns.FirstOrDefault(a => a.Name.ToLower().Equals(name.ToLower()));
                            if (prop == null)
                            {
                                continue;
                            }
                            var val = reader.IsDBNull(i) ? null : reader[i];
                            prop.SetValue(newObject, val, null);
                        }
                        lst.Add(newObject);
                    }

                    return lst;
                }
            }
        }

        public async Task<List<T>> SqlQueryAsync<T>(string query, params DbParameter[] prms) where T : class, new()
        {
            DataBaseContext db = GetDbContext();

            using (var command = db.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = query;
                command.CommandType = CommandType.Text;

                command.Parameters.Clear();
                if (prms != null)
                {
                    foreach (var param in prms)
                    {
                        command.Parameters.Add(param);
                    }
                }

                db.Database.OpenConnection();
                using (var reader = await command.ExecuteReaderAsync())
                {
                    var lst = new List<T>();
                    var lstColumns = new T().GetType().GetProperties(BindingFlags.DeclaredOnly | BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic).ToList();
                    while (await reader.ReadAsync())
                    {
                        var newObject = new T();
                        for (var i = 0; i < reader.FieldCount; i++)
                        {
                            var name = reader.GetName(i);
                            PropertyInfo prop = lstColumns.FirstOrDefault(a => a.Name.ToLower().Equals(name.ToLower()));
                            if (prop == null)
                            {
                                continue;
                            }
                            var val = reader.IsDBNull(i) ? null : reader[i];
                            prop.SetValue(newObject, val, null);
                        }
                        lst.Add(newObject);
                    }

                    return lst;
                }
            }
        }

        public void BeginTrans()
        {
            _trans = _db.Database.BeginTransaction();
        }

        public void CommitTrans()
        {
            if (_trans != null)
                _trans.Commit();
            _trans = null;
        }

        public void RollbackTrans()
        {
            if (_trans != null)
                _trans.Rollback();
            _trans = null;
        }

        private Dictionary<Type, object> repositoryDictionary = new Dictionary<Type, object>();

        private void PutInDictionary<T>(IRepository<T> rep)
        {
            if (!repositoryDictionary.ContainsKey(typeof(T)))
            {
                repositoryDictionary.Add(typeof(T), rep);
            }
        }

        public IRepository<T> GetRep<T>() where T : class
        {
            Type type = typeof(T);

            if (this.repositoryDictionary.ContainsKey(type))
            {
                IRepository<T> res = (IRepository<T>)repositoryDictionary[type];

                return res;
            }


            var res2 = new DataBaseRepository<T>(_db);

            PutInDictionary<T>(res2);

            return res2;
        }

        public void ExecuteNonQuerySqlCommand(string query, params DbParameter[] prms)
        {
            DataBaseContext db = GetDbContext();

            using (var command = db.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = query;
                command.CommandType = CommandType.Text;

                command.Parameters.Clear();
                if (prms != null)
                {
                    foreach (var param in prms)
                    {
                        command.Parameters.Add(param);
                    }
                }

                db.Database.OpenConnection();
                command.ExecuteNonQuery();
            }
        }

        public DataSet ExecuteStoredProcedure(string storedProcedureName, params DbParameter[] parameters)
        {
            var res = new DataSet();

            using (var command = _db.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = storedProcedureName;
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddRange(parameters);

                _db.Database.OpenConnection();

                if (_db.Database.CurrentTransaction != null)
                    command.Transaction = (_db.Database.CurrentTransaction as IInfrastructure<DbTransaction>).Instance;

                using (DbDataReader reader = command.ExecuteReader())
                {
                    DataTable dt = new DataTable();
                    dt.Load(reader);
                    res.Tables.Add(dt);
                }
            }

            return res;
        }

        public DataSet ExecuteSqlCommand(string query, params DbParameter[] parameters)
        {
            var res = new DataSet();

            using (var command = _db.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = query;
                command.CommandType = CommandType.Text;
                command.Parameters.AddRange(parameters);

                _db.Database.OpenConnection();

                if (_db.Database.CurrentTransaction != null)
                    command.Transaction = (_db.Database.CurrentTransaction as IInfrastructure<DbTransaction>).Instance;

                using (DbDataReader reader = command.ExecuteReader())
                {
                    DataTable dt = new DataTable();
                    dt.Load(reader);
                    res.Tables.Add(dt);
                }
            }

            return res;
        }
    }
}
