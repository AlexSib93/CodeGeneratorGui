
import React, { useState, ChangeEvent, FormEvent, useEffect, useMemo } from 'react';
import { PropMetadata } from "../models/PropMetadata";
import PropMetadataService from "../services/PropMetadataService";
import {Table} from "../components/Table";
import {Grid} from '../components/Grid';






 interface PropMetadataEditFormProps {
   model: PropMetadata;
   onSave: (item: PropMetadata) => void;
   onCancel: () => void;
 }
 
 const PropMetadataEditForm: React.FC<PropMetadataEditFormProps> = (props: PropMetadataEditFormProps) => {
   const [editedItem, setEditedItem] = useState<PropMetadata>(props.model);

  
  useEffect(() => {
    if(editedItem.idPropMetadata > 0) {
      console.log('useEffect editedItem',editedItem);      
      PropMetadataService.get(editedItem.idPropMetadata ).then((item) => {
        setEditedItem(item);
      });
    }
  }, [editedItem.idPropMetadata])





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
         {<form onSubmit={handleSubmit} className="form">
           <h1 className="h3 mb-3 fw-normal">Свойство</h1>
               
      <div className="m-3">                
        <label className="form-label" htmlFor="floatingInputName">Наименование</label>
        <input name="name" className="form-control" id="floatingInputName" placeholder="Наименование" autoComplete="off" value={editedItem.name} onChange={ handleInputChange } />
      </div>

      <div className="m-3">                
        <label className="form-label" htmlFor="floatingInputType">Тип данных C#</label>
        <input name="type" className="form-control" id="floatingInputType" placeholder="Тип данных C#" autoComplete="off" value={editedItem.type} onChange={ handleInputChange } />
      </div>

      <div className="m-3">                
        <label className="form-label" htmlFor="floatingInputCaption">Отображаемое имя</label>
        <input name="caption" className="form-control" id="floatingInputCaption" placeholder="Отображаемое имя" autoComplete="off" value={editedItem.caption} onChange={ handleInputChange } />
      </div>

      <div className="form-check m-3">
        <label className="form-check-label" htmlFor="flexCheckIsPrimaryKey">Первичный ключ</label>
        <input name="isPrimaryKey" className="form-check-input" type="checkbox" checked={editedItem.isPrimaryKey} id="flexCheckIsPrimaryKey" onChange={ handleCheckBoxChange } />
      </div>

      <div className="form-check m-3">
        <label className="form-check-label" htmlFor="flexCheckIsVirtual">Свойство внешней связи</label>
        <input name="isVirtual" className="form-check-input" type="checkbox" checked={editedItem.isVirtual} id="flexCheckIsVirtual" onChange={ handleCheckBoxChange } />
      </div>

      <div className="form-check m-3">
        <label className="form-check-label" htmlFor="flexCheckVisible">Отображать свойство в интерфейсе</label>
        <input name="visible" className="form-check-input" type="checkbox" checked={editedItem.visible} id="flexCheckVisible" onChange={ handleCheckBoxChange } />
      </div>

      <div className="form-check m-3">
        <label className="form-check-label" htmlFor="flexCheckEditable">Доступ к редактированию поля</label>
        <input name="editable" className="form-check-input" type="checkbox" checked={editedItem.editable} id="flexCheckEditable" onChange={ handleCheckBoxChange } />
      </div>

      <div className="form-check m-3">
        <label className="form-check-label" htmlFor="flexCheckJsonIgnore">Не передавать на клиент</label>
        <input name="jsonIgnore" className="form-check-input" type="checkbox" checked={editedItem.jsonIgnore} id="flexCheckJsonIgnore" onChange={ handleCheckBoxChange } />
      </div>

      <div className="form-check m-3">
        <label className="form-check-label" htmlFor="flexCheckIsEnumerable">Перечисление</label>
        <input name="isEnumerable" className="form-check-input" type="checkbox" checked={editedItem.isEnumerable} id="flexCheckIsEnumerable" onChange={ handleCheckBoxChange } />
      </div>

      <div className="form-check m-3">
        <label className="form-check-label" htmlFor="flexCheckIsMasterProp">Ссылка на мастера</label>
        <input name="isMasterProp" className="form-check-input" type="checkbox" checked={editedItem.isMasterProp} id="flexCheckIsMasterProp" onChange={ handleCheckBoxChange } />
      </div>

      <div className="form-check m-3">
        <label className="form-check-label" htmlFor="flexCheckIsDetailsProp">Детейл</label>
        <input name="isDetailsProp" className="form-check-input" type="checkbox" checked={editedItem.isDetailsProp} id="flexCheckIsDetailsProp" onChange={ handleCheckBoxChange } />
      </div>

      <div className="form-check m-3">
        <label className="form-check-label" htmlFor="flexCheckIsDictValueProp">Значение из справочника</label>
        <input name="isDictValueProp" className="form-check-input" type="checkbox" checked={editedItem.isDictValueProp} id="flexCheckIsDictValueProp" onChange={ handleCheckBoxChange } />
      </div>
         <button className="w-50 btn btn-danger"  type='button' onClick={props.onCancel} >Отмена</button>
         <button className="w-50 btn btn-success" type='button' onClick={() => props.onSave(editedItem)} >Сохранить</button>
         </form>}

    </div>
   );
 };



 export default PropMetadataEditForm;
  