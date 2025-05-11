
import React, { useState, ChangeEvent, FormEvent, useEffect, useMemo } from 'react';
import { FormMetadata } from "../models/FormMetadata";
import FormMetadataService from "../services/FormMetadataService";
import {Table} from "../components/Table";
import {Grid} from '../components/Grid';
import {ComponentMetadata,initComponentMetadata} from '../models/ComponentMetadata';
import ComponentMetadataEditForm from './ComponentMetadataEditForm';
import {ModelMetadata,initModelMetadata} from '../models/ModelMetadata';
import ModelMetadataService from "../services/ModelMetadataService";
import { ComponentTypeEnum, componentTypeEnumToString, componentTypeEnumArray } from "../enums/ComponentTypeEnum";


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

  
  const [lookUpItemsFormMetadata, setLookUpItemsFormMetadata] = useState<FormMetadata[]>();
  
  useEffect(() => {
    FormMetadataService.getall().then((item) => {
        setLookUpItemsFormMetadata(item);
    });
  }, [])

  const selectLookUpItemsFormMetadata = useMemo(()=>lookUpItemsFormMetadata ? lookUpItemsFormMetadata.map(i => <option  key={i.idFormMetadata}  value={i.idFormMetadata}>{i.name + ' ' + i.caption + ' ' + i.description + ' ' + i.addToNavBar}</option>):null, [lookUpItemsFormMetadata]);

  
  const [lookUpItemsModelMetadata, setLookUpItemsModelMetadata] = useState<ModelMetadata[]>();
  
  useEffect(() => {
    ModelMetadataService.getall().then((item) => {
        setLookUpItemsModelMetadata(item);
    });
  }, [])

  const selectLookUpItemsModelMetadata = useMemo(()=>lookUpItemsModelMetadata ? lookUpItemsModelMetadata.map(i => <option  key={i.idModelMetadata}  value={i.idModelMetadata}>{i.name + ' ' + i.initData + ' ' + i.nameSpace + ' ' + i.caption}</option>):null, [lookUpItemsModelMetadata]);




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

      <div className="form-check m-3">
        <label className="form-check-label" htmlFor="flexCheckAddToNavBar">Добавить в панель навигации</label>
        <input name="addToNavBar" className="form-check-input" type="checkbox" checked={editedItem.addToNavBar} id="flexCheckAddToNavBar" onChange={ handleCheckBoxChange } />
      </div>
      <div className="m-3 card">    
        <div className="card-body"> 
            <div className="card-title">
                <h1 className="h4 fw-normal">Компоненты формы</h1>
            </div>
            <div className="card-text">
                <Grid  onAdd={addComponents} onEdit={setEditedComponents} onDelete={handleDeleteComponents} items={editedItem.components} props={[{Name:'idComponentMetadata', Caption: 'ID компонента формы', Visible: false, Type: 'int'}, {Name:'name', Caption: 'Наименование', Visible: true, Type: 'string'}, {Name:'caption', Caption: 'Отображаемое имя', Visible: true, Type: 'string'}, {Name:'description', Caption: 'Описание', Visible: true, Type: 'string'}, {Name:'type', Caption: 'Тип компонента', Visible: true, Type: 'Set', ToString: componentTypeEnumToString, Values: componentTypeEnumArray }, {Name:'typeString', Caption: 'Тип компонента', Visible: true, Type: 'string'}, {Name:'modelProp', Caption: 'Компонент свойства модели', Visible: true, Type: 'bool'}]} />
            </div>
        </div>
      </div>

      <div className="m-3">   
        <label className="form-label" htmlFor="editForm">Форма редактирования</label>
        <select name="editForm" className="form-control selectpicker" data-live-search="true" id="editForm"  value={editedItem.idEditForm}  onChange={(e) =>  handleSelectChange(e, (id:number) => lookUpItemsFormMetadata.find(p => p.idFormMetadata === id))}>
            {selectLookUpItemsFormMetadata}
        </select>
      </div> 


      <div className="m-3">   
        <label className="form-label" htmlFor="model">Модель</label>
        <select name="model" className="form-control selectpicker" data-live-search="true" id="model"  value={editedItem.idModel}  onChange={(e) =>  handleSelectChange(e, (id:number) => lookUpItemsModelMetadata.find(p => p.idModelMetadata === id))}>
            {selectLookUpItemsModelMetadata}
        </select>
      </div> 

         <button className="w-50 btn btn-danger"  type='button' onClick={props.onCancel} >Отмена</button>
         <button className="w-50 btn btn-success" type='button' onClick={() => props.onSave(editedItem)} >Сохранить</button>
         </form>}

        { editedComponents && <ComponentMetadataEditForm model={editedComponents} onSave={submitEditFormComponents} onCancel={handleCancelEditComponents} />}
    </div>
   );
 };



 export default FormMetadataEditForm;
  