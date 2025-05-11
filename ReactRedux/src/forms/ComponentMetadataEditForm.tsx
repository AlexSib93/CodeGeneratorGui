
import React, { useState, ChangeEvent, FormEvent, useEffect, useMemo } from 'react';
import { ComponentMetadata } from "../models/ComponentMetadata";
import ComponentMetadataService from "../services/ComponentMetadataService";
import {Table} from "../components/Table";
import {Grid} from '../components/Grid';
import {PropMetadata,initPropMetadata} from '../models/PropMetadata';
import PropMetadataEditForm from './PropMetadataEditForm';

import PropMetadataService from "../services/PropMetadataService";
import { ComponentTypeEnum, componentTypeEnumToString, componentTypeEnumArray } from "../enums/ComponentTypeEnum";
import { PropTypeEnum, propTypeEnumToString, propTypeEnumArray } from "../enums/PropTypeEnum";


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

  
  const [lookUpItemsPropMetadata, setLookUpItemsPropMetadata] = useState<PropMetadata[]>();
  
  useEffect(() => {
    PropMetadataService.getall().then((item) => {
        setLookUpItemsPropMetadata(item);
    });
  }, [])

  const selectLookUpItemsPropMetadata = useMemo(()=>lookUpItemsPropMetadata ? lookUpItemsPropMetadata.map(i => <option  key={i.idPropMetadata}  value={i.idPropMetadata}>{i.name + ' ' + i.type + ' ' + i.caption + ' ' + i.expression + ' ' + i.isPrimaryKey + ' ' + i.visible + ' ' + i.editable + ' ' + i.jsonIgnore + ' ' + i.propType + ' ' + i.isVirtual + ' ' + i.isNullable + ' ' + i.isEnumerable + ' ' + i.typeOfEnumerable + ' ' + i.typeOfNullable}</option>):null, [lookUpItemsPropMetadata]);




  const [editedProps, setEditedProps] = useState<PropMetadata>(null);

  const addProps = () => {
    let newItem: PropMetadata = { ...initPropMetadata};
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
        <label className="form-label" htmlFor="type">Тип компонента</label>
        <select name="type" className="form-control selectpicker" data-live-search="true" id="type"  value={editedItem.type}  onChange={handleEnumSelectChange}>
                        
         <option  key={ComponentTypeEnum.DetailTable} value={ComponentTypeEnum.DetailTable}> Таблица детейлов </option>,
         <option  key={ComponentTypeEnum.Input} value={ComponentTypeEnum.Input}> Текстовое поле ввода </option>,
         <option  key={ComponentTypeEnum.DateTime} value={ComponentTypeEnum.DateTime}> Поле выбора даты </option>,
         <option  key={ComponentTypeEnum.NumericUpDown} value={ComponentTypeEnum.NumericUpDown}> Поле ввода числа </option>,
         <option  key={ComponentTypeEnum.CancelButton} value={ComponentTypeEnum.CancelButton}> Кнопка отмены </option>,
         <option  key={ComponentTypeEnum.SubmitButton} value={ComponentTypeEnum.SubmitButton}> Кнопка отправки формы </option>,
         <option  key={ComponentTypeEnum.SaveButton} value={ComponentTypeEnum.SaveButton}> Кнопка сохранения </option>,
         <option  key={ComponentTypeEnum.LookUp} value={ComponentTypeEnum.LookUp}> Выпадающий список для выбора из справочника </option>,
         <option  key={ComponentTypeEnum.Grid} value={ComponentTypeEnum.Grid}> Таблица с фильтрами и сортировкой </option>,
         <option  key={ComponentTypeEnum.EnumLookUp} value={ComponentTypeEnum.EnumLookUp}> Выпадающий список для выбора из типа-перечисления </option>
        </select>
      </div> 


      <div className="m-3">                
        <label className="form-label" htmlFor="floatingInputTypeString">Тип компонента</label>
        <input name="typeString" className="form-control" id="floatingInputTypeString" placeholder="Тип компонента" autoComplete="off" value={editedItem.typeString} onChange={ handleInputChange } />
      </div>

      <div className="m-3">   
        <label className="form-label" htmlFor="modelPropMetadata">Свойство Модели для которого используется компонент</label>
        <select name="modelPropMetadata" className="form-control selectpicker" data-live-search="true" id="modelPropMetadata"  value={editedItem.idModelPropMetadata}  onChange={(e) =>  handleSelectChange(e, (id:number) => lookUpItemsPropMetadata.find(p => p.idPropMetadata === id))}>
            {selectLookUpItemsPropMetadata}
        </select>
      </div> 

      <div className="m-3 card">    
        <div className="card-body"> 
            <div className="card-title">
                <h1 className="h4 fw-normal">Используется для табличных компонентов для передачи списка свойств и их подписей</h1>
            </div>
            <div className="card-text">
                <Grid  onAdd={addProps} onEdit={setEditedProps} onDelete={handleDeleteProps} items={editedItem.props} props={[{Name:'idPropMetadata', Caption: 'ID свойства', Visible: false, Type: 'int'}, {Name:'name', Caption: 'Наименование', Visible: true, Type: 'string'}, {Name:'type', Caption: 'Тип данных C#', Visible: true, Type: 'string'}, {Name:'caption', Caption: 'Отображаемое имя', Visible: true, Type: 'string'}, {Name:'expression', Caption: 'Выражение для вычислимого свойства', Visible: true, Type: 'string'}, {Name:'isPrimaryKey', Caption: 'Первичный ключ', Visible: true, Type: 'bool'}, {Name:'visible', Caption: 'Отображать свойство в интерфейсе', Visible: true, Type: 'bool'}, {Name:'editable', Caption: 'Доступ к редактированию поля', Visible: true, Type: 'bool'}, {Name:'jsonIgnore', Caption: 'Не передавать на клиент', Visible: true, Type: 'bool'}, {Name:'propType', Caption: 'Тип свойства', Visible: true, Type: 'Set', ToString: propTypeEnumToString, Values: propTypeEnumArray }, {Name:'isVirtual', Caption: 'Свойство внешней связи', Visible: true, Type: 'bool'}, {Name:'isNullable', Caption: 'Возможны пустые значения', Visible: true, Type: 'bool'}, {Name:'isEnumerable', Caption: 'Коллекция', Visible: true, Type: 'bool'}, {Name:'typeOfEnumerable', Caption: 'Тип экземпляра коллекции', Visible: true, Type: 'string'}, {Name:'typeOfNullable', Caption: 'Тип экземпляра коллекции', Visible: true, Type: 'string'}]} />
            </div>
        </div>
      </div>

      <div className="form-check m-3">
        <label className="form-check-label" htmlFor="flexCheckModelProp">Компонент свойства модели</label>
        <input name="modelProp" className="form-check-input" type="checkbox" checked={editedItem.modelProp} id="flexCheckModelProp" onChange={ handleCheckBoxChange } />
      </div>
         <button className="w-50 btn btn-danger"  type='button' onClick={props.onCancel} >Отмена</button>
         <button className="w-50 btn btn-success" type='button' onClick={() => props.onSave(editedItem)} >Сохранить</button>
         </form>}

        { editedProps && <PropMetadataEditForm model={editedProps} onSave={submitEditFormProps} onCancel={handleCancelEditProps} />}
    </div>
   );
 };



 export default ComponentMetadataEditForm;
  