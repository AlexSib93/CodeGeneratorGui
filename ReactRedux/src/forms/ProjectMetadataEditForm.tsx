
import React, { useState, ChangeEvent, FormEvent, useEffect, useMemo } from 'react';
import { ProjectMetadata } from "../models/ProjectMetadata";
import ProjectMetadataService from "../services/ProjectMetadataService";
import {Table} from "../components/Table";
import {Grid} from '../components/Grid';
import {ModelMetadata,initModelMetadata} from '../models/ModelMetadata';
import ModelMetadataEditForm from './ModelMetadataEditForm';
import {FormMetadata,initFormMetadata} from '../models/FormMetadata';
import FormMetadataEditForm from './FormMetadataEditForm';
import {EnumMetadata,initEnumMetadata} from '../models/EnumMetadata';
import EnumMetadataEditForm from './EnumMetadataEditForm';





 interface ProjectMetadataEditFormProps {
   model: ProjectMetadata;
   onSave: (item: ProjectMetadata) => void;
   onCancel: () => void;
 }
 
 const ProjectMetadataEditForm: React.FC<ProjectMetadataEditFormProps> = (props: ProjectMetadataEditFormProps) => {
   const [editedItem, setEditedItem] = useState<ProjectMetadata>(props.model);

  
  useEffect(() => {
    if(editedItem.idProjectMetadata > 0) {
      console.log('useEffect editedItem',editedItem);      
      ProjectMetadataService.get(editedItem.idProjectMetadata ).then((item) => {
        setEditedItem(item);
      });
    }
  }, [editedItem.idProjectMetadata])




  const [editedModels, setEditedModels] = useState<ModelMetadata>(null);

  const addModels = () => {
    let newItem: ModelMetadata = { ...initModelMetadata, idProjectMetadata: editedItem.idProjectMetadata };
    setEditedModels(newItem);
  }

  const submitEditFormModels = (model: ModelMetadata) => {
    setEditedModels(null);
    if (model && model.idModelMetadata > 0) {
              setEditedItem({ ...editedItem, models: editedItem.models.map(i=> (i.idModelMetadata===model.idModelMetadata)? model:i)});
            } else {
              setEditedItem({ ...editedItem, models: [...editedItem.models, model] });
            }
  }
  
  const handleDeleteModels = (model: ModelMetadata) => {
    setEditedItem((current) => { 
        var newItems = editedItem.models.filter(i => i !== model);
        return { ...current, models: newItems } 
    });
  };

    const handleCancelEditModels = () => {
        setEditedModels(null);
    };

  const [editedForms, setEditedForms] = useState<FormMetadata>(null);

  const addForms = () => {
    let newItem: FormMetadata = { ...initFormMetadata, idProjectMetadata: editedItem.idProjectMetadata };
    setEditedForms(newItem);
  }

  const submitEditFormForms = (model: FormMetadata) => {
    setEditedForms(null);
    if (model && model.idFormMetadata > 0) {
              setEditedItem({ ...editedItem, forms: editedItem.forms.map(i=> (i.idFormMetadata===model.idFormMetadata)? model:i)});
            } else {
              setEditedItem({ ...editedItem, forms: [...editedItem.forms, model] });
            }
  }
  
  const handleDeleteForms = (model: FormMetadata) => {
    setEditedItem((current) => { 
        var newItems = editedItem.forms.filter(i => i !== model);
        return { ...current, forms: newItems } 
    });
  };

    const handleCancelEditForms = () => {
        setEditedForms(null);
    };

  const [editedEnumTypes, setEditedEnumTypes] = useState<EnumMetadata>(null);

  const addEnumTypes = () => {
    let newItem: EnumMetadata = { ...initEnumMetadata, idProjectMetadata: editedItem.idProjectMetadata };
    setEditedEnumTypes(newItem);
  }

  const submitEditFormEnumTypes = (model: EnumMetadata) => {
    setEditedEnumTypes(null);
    if (model && model.idEnumMetadata > 0) {
              setEditedItem({ ...editedItem, enumTypes: editedItem.enumTypes.map(i=> (i.idEnumMetadata===model.idEnumMetadata)? model:i)});
            } else {
              setEditedItem({ ...editedItem, enumTypes: [...editedItem.enumTypes, model] });
            }
  }
  
  const handleDeleteEnumTypes = (model: EnumMetadata) => {
    setEditedItem((current) => { 
        var newItems = editedItem.enumTypes.filter(i => i !== model);
        return { ...current, enumTypes: newItems } 
    });
  };

    const handleCancelEditEnumTypes = () => {
        setEditedEnumTypes(null);
    };


   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target;

    let newVal: any = value;
    if(e.target.type === 'number') {
        newVal = +value;
    }

    if(e.target.type === 'date') {
        newVal = new Date(value);
    }

     setEditedItem({ ...editedItem, [name]: newVal });
   };

   const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEditedItem({ ...editedItem, [name]: checked });
  };

const toUpperFirstChar = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>, getItemFunc: (id: number) => any ) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, ["id" + toUpperFirstChar(name)]: Number(value), [name]: getItemFunc(Number(value)) });
  };


  const handleEnumSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: Number(value) });
  };

   const handleSubmit = (e: FormEvent) => {
     e.preventDefault();
     props.onSave(editedItem);
   };

     const autoGenFormMetadata = (): void => {
         GeneratorService.genProjectFormMetadata(editedItem.name)
             .then(setEditedItem);
     }

     const genCode = (): void => {
         GeneratorService.genCode(editedItem.name)
             .then();
     }

     const deployProject = (): void => {
         GeneratorService.deployProject(editedItem.name)
             .then();
     }

   return (
    <div>
         {!editedModels && !editedForms && !editedEnumTypes && <form onSubmit={handleSubmit} className="form">
           <h1 className="h3 mb-3 fw-normal">Проект</h1>
               
      <div className="m-3">                
        <label className="form-label" htmlFor="floatingInputName">Наименование</label>
        <input name="name" className="form-control" id="floatingInputName" placeholder="Наименование" autoComplete="off" value={editedItem.name} onChange={ handleInputChange } />
      </div>

      <div className="m-3">                
        <label className="form-label" htmlFor="floatingInputDescription">Описание</label>
        <input name="description" className="form-control" id="floatingInputDescription" placeholder="Описание" autoComplete="off" value={editedItem.description} onChange={ handleInputChange } />
      </div>

      <div className="m-3">                
        <label className="form-label" htmlFor="floatingInputPath">Путь</label>
        <input name="path" className="form-control" id="floatingInputPath" placeholder="Путь" autoComplete="off" value={editedItem.path} onChange={ handleInputChange } />
      </div>

      <div className="m-3">                
        <label className="form-label" htmlFor="floatingInputDbConnectionString">Строка подключения к БД</label>
        <input name="dbConnectionString" className="form-control" id="floatingInputDbConnectionString" placeholder="Строка подключения к БД" autoComplete="off" value={editedItem.dbConnectionString} onChange={ handleInputChange } />
      </div>

      <div className="m-3">                
        <label className="form-label" htmlFor="floatingInputUnitOfWork">Объект работы с БД (MockUnit или EfUnit )</label>
        <input name="unitOfWork" className="form-control" id="floatingInputUnitOfWork" placeholder="Объект работы с БД (MockUnit или EfUnit )" autoComplete="off" value={editedItem.unitOfWork} onChange={ handleInputChange } />
      </div>

      <div className="m-3">            
        <label className="form-label" htmlFor="floatingInputWebApiHttpsPort">Порт для запуска WebApi</label>
        <input name="webApiHttpsPort" type="number" className="form-control" id="floatingInputWebApiHttpsPort" placeholder="Порт для запуска WebApi" autoComplete="off" value={editedItem.webApiHttpsPort} onChange={ handleInputChange } />
      </div>

      <div className="m-3">            
        <label className="form-label" htmlFor="floatingInputDevServerPort">Порт для запуска WebPackDevServer</label>
        <input name="devServerPort" type="number" className="form-control" id="floatingInputDevServerPort" placeholder="Порт для запуска WebPackDevServer" autoComplete="off" value={editedItem.devServerPort} onChange={ handleInputChange } />
      </div>
      <div className="m-3 card">    
        <div className="card-body"> 
            <div className="card-title">
                <h1 className="h4 fw-normal">Модели</h1>
            </div>
            <div className="card-text">
                <Grid  onAdd={addModels} onEdit={setEditedModels} onDelete={handleDeleteModels} items={editedItem.models} props={[{Name:'idModelMetadata', Caption: 'ID', Visible: false, Type: 'int'}, {Name:'name', Caption: 'Имя', Visible: true, Type: 'string'}, {Name:'initData', Caption: 'Начальные данные', Visible: true, Type: 'string'}, {Name:'nameSpace', Caption: 'Пространство имен', Visible: true, Type: 'string'}, {Name:'caption', Caption: 'Отображаемое имя', Visible: true, Type: 'string'}]} />
            </div>
        </div>
      </div>
      <div className="m-3 card">    
        <div className="card-body"> 
            <div className="card-title">
                <h1 className="h4 fw-normal">Формы</h1>
            </div>
            <div className="card-text">
                <Grid  onAdd={addForms} onEdit={setEditedForms} onDelete={handleDeleteForms} items={editedItem.forms} props={[{Name:'idFormMetadata', Caption: 'ID формы', Visible: false, Type: 'int'}, {Name:'name', Caption: 'Наименование', Visible: true, Type: 'string'}, {Name:'caption', Caption: 'Отображаемое имя', Visible: true, Type: 'string'}, {Name:'description', Caption: 'Описание', Visible: true, Type: 'string'}, {Name:'addToNavBar', Caption: 'Добавить в панель навигации', Visible: true, Type: 'bool'}]} />
            </div>
        </div>
      </div>
      <div className="m-3 card">    
        <div className="card-body"> 
            <div className="card-title">
                <h1 className="h4 fw-normal">Типы-перечисления</h1>
            </div>
            <div className="card-text">
                <Grid  onAdd={addEnumTypes} onEdit={setEditedEnumTypes} onDelete={handleDeleteEnumTypes} items={editedItem.enumTypes} props={[{Name:'idEnumMetadata', Caption: 'ID типа-перечисления', Visible: false, Type: 'int'}, {Name:'name', Caption: 'Наименование', Visible: true, Type: 'string'}, {Name:'caption', Caption: 'Отображаемое имя', Visible: true, Type: 'string'}]} />
            </div>
        </div>
      </div>
               <div className='row'>
                   <button className="col btn btn-danger" type='button' onClick={props.onCancel} >Отмена</button>
                   <button type='button' onClick={() => autoGenFormMetadata()} className="col btn btn-light">Сгенерировать метаданные форм</button>
                   <button type='button' onClick={() => genCode()} className="col btn btn-light">Сгенерировать код</button>
                   <button type='button' onClick={() => deployProject()} className="col btn btn-light">Развернуть проект</button>
                   <button className="col btn btn-success" type='button' onClick={() => props.onSave(editedItem)} >Сохранить</button>
               </div>
         </form>}

        { editedModels && <ModelMetadataEditForm model={editedModels} onSave={submitEditFormModels} onCancel={handleCancelEditModels} />}
        { editedForms && <FormMetadataEditForm model={editedForms} onSave={submitEditFormForms} onCancel={handleCancelEditForms} />}
        { editedEnumTypes && <EnumMetadataEditForm model={editedEnumTypes} onSave={submitEditFormEnumTypes} onCancel={handleCancelEditEnumTypes} />}
    </div>
   );
 };



 export default ProjectMetadataEditForm;
  