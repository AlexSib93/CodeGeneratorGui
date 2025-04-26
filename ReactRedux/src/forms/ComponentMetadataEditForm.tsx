
import React, { useState, ChangeEvent, FormEvent, useEffect, useMemo } from 'react';
import { ComponentMetadata } from "../models/ComponentMetadata";
import ComponentMetadataService from "../services/ComponentMetadataService";
import {Table} from "../components/Table";
import {Grid} from '../components/Grid';
import {PropMetadata,initPropMetadata} from '../models/PropMetadata';
import PropMetadataEditForm from './PropMetadataEditForm';




 interface ComponentMetadataEditFormProps {
   model: ComponentMetadata;
   onSave: (item: ComponentMetadata) => void;
   onCancel: () => void;
 }
 
 const ComponentMetadataEditForm: React.FC<ComponentMetadataEditFormProps> = (props: ComponentMetadataEditFormProps) => {
   const [editedItem, setEditedItem] = useState<ComponentMetadata>(props.model);

  
  useEffect(() => {
    if(editedItem.idComponentMetadata > 0) {
      console.log('useEffect editedItem',editedItem);      
      ComponentMetadataService.get(editedItem.idComponentMetadata ).then((item) => {
        setEditedItem(item);
      });
    }
  }, [editedItem.idComponentMetadata])




  const [editedProps, setEditedProps] = useState<PropMetadata>(null);

  const addProps = () => {
    let newItem: PropMetadata = { ...initPropMetadata, idComponentMetadata: editedItem.idComponentMetadata };
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
           <h1 className="h3 mb-3 fw-normal">Компонент формы</h1>
               
      <div className="m-3">                
        <label className="form-label" htmlFor="floatingInputName">Наименование</label>
        <input name="name" className="form-control" id="floatingInputName" placeholder="Наименование" autoComplete="off" value={editedItem.name} onChange={ handleInputChange } />
      </div>

      <div className="m-3">                
        <label className="form-label" htmlFor="floatingInputCaption">Отображаемое имя</label>
        <input name="caption" className="form-control" id="floatingInputCaption" placeholder="Отображаемое имя" autoComplete="off" value={editedItem.caption} onChange={ handleInputChange } />
      </div>

      <div className="m-3">                
        <label className="form-label" htmlFor="floatingInputDescription">Описание</label>
        <input name="description" className="form-control" id="floatingInputDescription" placeholder="Описание" autoComplete="off" value={editedItem.description} onChange={ handleInputChange } />
      </div>

      <div className="m-3">                
        <label className="form-label" htmlFor="floatingInputType">Тип данных C#</label>
        <input name="type" className="form-control" id="floatingInputType" placeholder="Тип данных C#" autoComplete="off" value={editedItem.type} onChange={ handleInputChange } />
      </div>
      <div className="m-3 card">    
        <div className="card-body"> 
            <div className="card-title">
                <h1 className="h4 fw-normal">Используется для табличных компонентов для передачи списка свойств и их подписей</h1>
            </div>
            <div className="card-text">
                <Grid  onAdd={addProps} onEdit={setEditedProps} onDelete={handleDeleteProps} items={editedItem.props} props={[{Name:'idPropMetadata', Caption: 'ID свойства', Visible: false, Type: 'int'}, {Name:'name', Caption: 'Наименование', Visible: true, Type: 'string'}, {Name:'type', Caption: 'Тип данных C#', Visible: true, Type: 'string'}, {Name:'caption', Caption: 'Отображаемое имя', Visible: true, Type: 'string'}]} />
            </div>
        </div>
      </div>

      <div className="m-3">                
        <label className="form-label" htmlFor="floatingInputModelProp">Компонент свойства модели</label>
        <input name="modelProp" className="form-control" id="floatingInputModelProp" placeholder="Компонент свойства модели" autoComplete="off" value={editedItem.modelProp} onChange={ handleInputChange } />
      </div>
         <button className="w-50 btn btn-danger" >Отмена</button>
         <button className="w-50 btn btn-success" type="submit">Сохранить</button>
         </form>}

        { editedProps && <PropMetadataEditForm model={editedProps} onSave={submitEditFormProps} onCancel={handleCancelEditProps} />}
    </div>
   );
 };



 export default ComponentMetadataEditForm;
  