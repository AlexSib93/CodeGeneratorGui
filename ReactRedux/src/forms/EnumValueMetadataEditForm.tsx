
import React, { useState, ChangeEvent, FormEvent, useEffect, useMemo } from 'react';
import { EnumValueMetadata } from "../models/EnumValueMetadata";
import EnumValueMetadataService from "../services/EnumValueMetadataService";
import {Table} from "../components/Table";
import {Grid} from '../components/Grid';






 interface EnumValueMetadataEditFormProps {
   model: EnumValueMetadata;
   onSave: (item: EnumValueMetadata) => void;
   onCancel: () => void;
 }
 
 const EnumValueMetadataEditForm: React.FC<EnumValueMetadataEditFormProps> = (props: EnumValueMetadataEditFormProps) => {
   const [editedItem, setEditedItem] = useState<EnumValueMetadata>(props.model);

  
  useEffect(() => {
    if(editedItem.idEnumValueMetadata > 0) {
      console.log('useEffect editedItem',editedItem);      
      EnumValueMetadataService.get(editedItem.idEnumValueMetadata ).then((item) => {
        setEditedItem(item);
      });
    }
  }, [editedItem.idEnumValueMetadata])





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
           <h1 className="h3 mb-3 fw-normal">Значение типа-перечисления</h1>
               
      <div className="m-3">                
        <label className="form-label" htmlFor="floatingInputName">Наименование</label>
        <input name="name" className="form-control" id="floatingInputName" placeholder="Наименование" autoComplete="off" value={editedItem.name} onChange={ handleInputChange } />
      </div>

      <div className="m-3">                
        <label className="form-label" htmlFor="floatingInputCaption">Отображаемое имя</label>
        <input name="caption" className="form-control" id="floatingInputCaption" placeholder="Отображаемое имя" autoComplete="off" value={editedItem.caption} onChange={ handleInputChange } />
      </div>
         <button className="w-50 btn btn-danger"  type='button' onClick={props.onCancel} >Отмена</button>
         <button className="w-50 btn btn-success" type='button' onClick={() => props.onSave(editedItem)} >Сохранить</button>
         </form>}

    </div>
   );
 };



 export default EnumValueMetadataEditForm;
  