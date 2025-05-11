
import React, { useState, ChangeEvent, FormEvent, useEffect, useMemo } from 'react';
import { PropMetadata } from "../models/PropMetadata";
import PropMetadataService from "../services/PropMetadataService";
import {Table} from "../components/Table";
import {Grid} from '../components/Grid';



import { PropTypeEnum, propTypeEnumToString, propTypeEnumArray } from "../enums/PropTypeEnum";


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

      <div className="m-3">                
        <label className="form-label" htmlFor="floatingInputExpression">Выражение для вычислимого свойства</label>
        <input name="expression" className="form-control" id="floatingInputExpression" placeholder="Выражение для вычислимого свойства" autoComplete="off" value={editedItem.expression} onChange={ handleInputChange } />
      </div>

      <div className="form-check m-3">
        <label className="form-check-label" htmlFor="flexCheckIsPrimaryKey">Первичный ключ</label>
        <input name="isPrimaryKey" className="form-check-input" type="checkbox" checked={editedItem.isPrimaryKey} id="flexCheckIsPrimaryKey" onChange={ handleCheckBoxChange } />
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

      <div className="m-3">   
        <label className="form-label" htmlFor="propType">Тип свойства</label>
        <select name="propType" className="form-control selectpicker" data-live-search="true" id="propType"  value={editedItem.propType}  onChange={handleEnumSelectChange}>
                        
         <option  key={PropTypeEnum.Single} value={PropTypeEnum.Single}> Свойство примитивного типа </option>,
         <option  key={PropTypeEnum.Master} value={PropTypeEnum.Master}> Свойство ссылка на Матера (объект-родитель) </option>,
         <option  key={PropTypeEnum.Detail} value={PropTypeEnum.Detail}> Свойство детейлов </option>,
         <option  key={PropTypeEnum.DictValue} value={PropTypeEnum.DictValue}> Свойство - значение выбираемое из справочника </option>,
         <option  key={PropTypeEnum.Enum} value={PropTypeEnum.Enum}> Свойство перечисления </option>,
         <option  key={PropTypeEnum.CalcValue} value={PropTypeEnum.CalcValue}> Вычислимое свойство </option>
        </select>
      </div> 


      <div className="form-check m-3">
        <label className="form-check-label" htmlFor="flexCheckIsVirtual">Свойство внешней связи</label>
        <input name="isVirtual" className="form-check-input" type="checkbox" checked={editedItem.isVirtual} id="flexCheckIsVirtual" onChange={ handleCheckBoxChange } />
      </div>

      <div className="form-check m-3">
        <label className="form-check-label" htmlFor="flexCheckIsNullable">Возможны пустые значения</label>
        <input name="isNullable" className="form-check-input" type="checkbox" checked={editedItem.isNullable} id="flexCheckIsNullable" onChange={ handleCheckBoxChange } />
      </div>

      <div className="form-check m-3">
        <label className="form-check-label" htmlFor="flexCheckIsEnumerable">Коллекция</label>
        <input name="isEnumerable" className="form-check-input" type="checkbox" checked={editedItem.isEnumerable} id="flexCheckIsEnumerable" onChange={ handleCheckBoxChange } />
      </div>

      <div className="m-3">                
        <label className="form-label" htmlFor="floatingInputTypeOfEnumerable">Тип экземпляра коллекции</label>
        <input name="typeOfEnumerable" className="form-control" id="floatingInputTypeOfEnumerable" placeholder="Тип экземпляра коллекции" autoComplete="off" value={editedItem.typeOfEnumerable} onChange={ handleInputChange } />
      </div>

      <div className="m-3">                
        <label className="form-label" htmlFor="floatingInputTypeOfNullable">Тип экземпляра коллекции</label>
        <input name="typeOfNullable" className="form-control" id="floatingInputTypeOfNullable" placeholder="Тип экземпляра коллекции" autoComplete="off" value={editedItem.typeOfNullable} onChange={ handleInputChange } />
      </div>
         <button className="w-50 btn btn-danger"  type='button' onClick={props.onCancel} >Отмена</button>
         <button className="w-50 btn btn-success" type='button' onClick={() => props.onSave(editedItem)} >Сохранить</button>
         </form>}

    </div>
   );
 };



 export default PropMetadataEditForm;
  