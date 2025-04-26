
import React, { useState, ChangeEvent, FormEvent, useEffect, useMemo } from 'react';
import { FormMetadata } from "../models/FormMetadata";
import FormMetadataService from "../services/FormMetadataService";
import {Table} from "../components/Table";
import {Grid} from '../components/Grid';
import {ComponentMetadata,initComponentMetadata} from '../models/ComponentMetadata';
import ComponentMetadataEditForm from './ComponentMetadataEditForm';




 interface FormMetadataEditFormProps {
   model: FormMetadata;
   onSave: (item: FormMetadata) => void;
   onCancel: () => void;
 }
 
 const FormMetadataEditForm: React.FC<FormMetadataEditFormProps> = (props: FormMetadataEditFormProps) => {
   const [editedItem, setEditedItem] = useState<FormMetadata>(props.model);

  
  useEffect(() => {
    if(editedItem.idFormMetadata > 0) {
      console.log('useEffect editedItem',editedItem);      
      FormMetadataService.get(editedItem.idFormMetadata ).then((item) => {
        setEditedItem(item);
      });
    }
  }, [editedItem.idFormMetadata])




  const [editedComponents, setEditedComponents] = useState<ComponentMetadata>(null);

  const addComponents = () => {
    let newItem: ComponentMetadata = { ...initComponentMetadata, idFormMetadata: editedItem.idFormMetadata };
    setEditedComponents(newItem);
  }

  const submitEditFormComponents = (model: ComponentMetadata) => {
    setEditedComponents(null);
    if (model && model.idComponentMetadata > 0) {
              setEditedItem({ ...editedItem, components: editedItem.components.map(i=> (i.idComponentMetadata===model.idComponentMetadata)? model:i)});
            } else {
              setEditedItem({ ...editedItem, components: [...editedItem.components, model] });
            }
  }
  
  const handleDeleteComponents = (model: ComponentMetadata) => {
    setEditedItem((current) => { 
        var newItems = editedItem.components.filter(i => i !== model);
        return { ...current, components: newItems } 
    });
  };

    const handleCancelEditComponents = () => {
        setEditedComponents(null);
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
         {!editedComponents && <form onSubmit={handleSubmit} className="form">
           <h1 className="h3 mb-3 fw-normal">Форма</h1>
               
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
        <label className="form-label" htmlFor="floatingInputAddToNavBar">Добавить в панель навигации</label>
        <input name="addToNavBar" className="form-control" id="floatingInputAddToNavBar" placeholder="Добавить в панель навигации" autoComplete="off" value={editedItem.addToNavBar} onChange={ handleInputChange } />
      </div>
      <div className="m-3 card">    
        <div className="card-body"> 
            <div className="card-title">
                <h1 className="h4 fw-normal">Формы</h1>
            </div>
            <div className="card-text">
                <Grid  onAdd={addComponents} onEdit={setEditedComponents} onDelete={handleDeleteComponents} items={editedItem.components} props={[{Name:'idComponentMetadata', Caption: 'ID компонента формы', Visible: false, Type: 'int'}, {Name:'name', Caption: 'Наименование', Visible: true, Type: 'string'}, {Name:'caption', Caption: 'Отображаемое имя', Visible: true, Type: 'string'}, {Name:'description', Caption: 'Описание', Visible: true, Type: 'string'}, {Name:'type', Caption: 'Тип данных C#', Visible: true, Type: 'string'}, {Name:'modelProp', Caption: 'Компонент свойства модели', Visible: true, Type: 'bool'}]} />
            </div>
        </div>
      </div>
         <button className="w-50 btn btn-danger" >Отмена</button>
         <button className="w-50 btn btn-success" type="submit">Сохранить</button>
         </form>}

        { editedComponents && <ComponentMetadataEditForm model={editedComponents} onSave={submitEditFormComponents} onCancel={handleCancelEditComponents} />}
    </div>
   );
 };



 export default FormMetadataEditForm;
  