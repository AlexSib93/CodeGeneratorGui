
import React, { useState, ChangeEvent, FormEvent, useEffect, useMemo } from 'react';
import { ModelMetadata } from "../models/ModelMetadata";
import ModelMetadataService from "../services/ModelMetadataService";
import {Table} from "../components/Table";
import {Grid} from '../components/Grid';
import {PropMetadata,initPropMetadata} from '../models/PropMetadata';
import PropMetadataEditForm from './PropMetadataEditForm';




 interface ModelMetadataEditFormProps {
   model: ModelMetadata;
   onSave: (item: ModelMetadata) => void;
   onCancel: () => void;
 }
 
 const ModelMetadataEditForm: React.FC<ModelMetadataEditFormProps> = (props: ModelMetadataEditFormProps) => {
   const [editedItem, setEditedItem] = useState<ModelMetadata>(props.model);

  
  useEffect(() => {
    if(editedItem.idModelMetadata > 0) {
      console.log('useEffect editedItem',editedItem);      
      ModelMetadataService.get(editedItem.idModelMetadata ).then((item) => {
        setEditedItem(item);
      });
    }
  }, [editedItem.idModelMetadata])




  const [editedProps, setEditedProps] = useState<PropMetadata>(null);

  const addProps = () => {
    let newItem: PropMetadata = { ...initPropMetadata, idModelMetadata: editedItem.idModelMetadata };
    setEditedProps(newItem);
  }

  const submitEditFormProps = (model: PropMetadata) => {
    setEditedProps(null);
    if (model && model.idPropMetadata > 0) {
              setEditedItem({ ...editedItem, props: editedItem.props.map(i=> (i.idPropMetadata===model.idPropMetadata)? model:i)});
            } else {
              setEditedItem({ ...editedItem, props: [...editedItem.props, model] });
            }
  }
  
  const handleDeleteProps = (model: PropMetadata) => {
    setEditedItem((current) => { 
        var newItems = editedItem.props.filter(i => i !== model);
        return { ...current, props: newItems } 
    });
  };

    const handleCancelEditProps = () => {
        setEditedProps(null);
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

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, ["id" + toUpperFirstChar(name)]: Number(value), [name]: null });
  };


   const handleSubmit = (e: FormEvent) => {
     e.preventDefault();
     props.onSave(editedItem);
   };
 
   return (
    <div>
         {!editedProps && <form onSubmit={handleSubmit} className="form">
           <h1 className="h3 mb-3 fw-normal">Модель</h1>
               
      <div className="m-3">                
        <label className="form-label" htmlFor="floatingInputName">Имя</label>
        <input name="name" className="form-control" id="floatingInputName" placeholder="Имя" autoComplete="off" value={editedItem.name} onChange={ handleInputChange } />
      </div>

      <div className="m-3">                
        <label className="form-label" htmlFor="floatingInputInitData">Начальные данные</label>
        <input name="initData" className="form-control" id="floatingInputInitData" placeholder="Начальные данные" autoComplete="off" value={editedItem.initData} onChange={ handleInputChange } />
      </div>

      <div className="m-3">                
        <label className="form-label" htmlFor="floatingInputNameSpace">Пространство имен</label>
        <input name="nameSpace" className="form-control" id="floatingInputNameSpace" placeholder="Пространство имен" autoComplete="off" value={editedItem.nameSpace} onChange={ handleInputChange } />
      </div>

      <div className="m-3">                
        <label className="form-label" htmlFor="floatingInputCaption">Отображаемое имя</label>
        <input name="caption" className="form-control" id="floatingInputCaption" placeholder="Отображаемое имя" autoComplete="off" value={editedItem.caption} onChange={ handleInputChange } />
      </div>
      <div className="m-3 card">    
        <div className="card-body"> 
            <div className="card-title">
                <h1 className="h4 fw-normal">Свойства</h1>
            </div>
            <div className="card-text">
                <Grid  onAdd={addProps} onEdit={setEditedProps} onDelete={handleDeleteProps} items={editedItem.props} props={[{Name:'idPropMetadata', Caption: 'ID свойства', Visible: false, Type: 'int'}, {Name:'name', Caption: 'Наименование', Visible: true, Type: 'string'}, {Name:'type', Caption: 'Тип данных C#', Visible: true, Type: 'string'}, {Name:'caption', Caption: 'Отображаемое имя', Visible: true, Type: 'string'}, {Name:'isPrimaryKey', Caption: 'Первичный ключ', Visible: true, Type: 'bool'}, {Name:'isVirtual', Caption: 'Свойство внешней связи', Visible: true, Type: 'bool'}, {Name:'visible', Caption: 'Отображать свойство в интерфейсе', Visible: true, Type: 'bool'}, {Name:'editable', Caption: 'Доступ к редактированию поля', Visible: true, Type: 'bool'}, {Name:'jsonIgnore', Caption: 'Не передавать на клиент', Visible: true, Type: 'bool'}, {Name:'isEnumerable', Caption: 'Перечисление', Visible: false, Type: 'bool'}, {Name:'isMasterProp', Caption: 'Ссылка на мастера', Visible: false, Type: 'bool'}, {Name:'isDetailsProp', Caption: 'Детейл', Visible: false, Type: 'bool'}, {Name:'isDictValueProp', Caption: 'Значение из справочника', Visible: false, Type: 'bool'}]} />
            </div>
        </div>
      </div>
         <button className="w-50 btn btn-danger" >Отмена</button>
         <button className="w-50 btn btn-success" type="submit">Сохранить</button>
         </form>}

        { editedProps && <PropMetadataEditForm model={editedProps} onSave={submitEditFormProps} onCancel={handleCancelEditProps} />}
    </div>
   );
 };



 export default ModelMetadataEditForm;
  