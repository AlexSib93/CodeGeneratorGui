
import React, { useState, ChangeEvent, FormEvent, useEffect, useMemo } from 'react';
import { EnumMetadata } from "../models/EnumMetadata";
import EnumMetadataService from "../services/EnumMetadataService";
import {Table} from "../components/Table";
import {Grid} from '../components/Grid';
import {EnumValueMetadata,initEnumValueMetadata} from '../models/EnumValueMetadata';
import EnumValueMetadataEditForm from './EnumValueMetadataEditForm';





 interface EnumMetadataEditFormProps {
   model: EnumMetadata;
   onSave: (item: EnumMetadata) => void;
   onCancel: () => void;
 }
 
 const EnumMetadataEditForm: React.FC<EnumMetadataEditFormProps> = (props: EnumMetadataEditFormProps) => {
   const [editedItem, setEditedItem] = useState<EnumMetadata>(props.model);

  
  useEffect(() => {
    if(editedItem.idEnumMetadata > 0) {
      console.log('useEffect editedItem',editedItem);      
      EnumMetadataService.get(editedItem.idEnumMetadata ).then((item) => {
        setEditedItem(item);
      });
    }
  }, [editedItem.idEnumMetadata])




  const [editedValues, setEditedValues] = useState<EnumValueMetadata>(null);

  const addValues = () => {
    let newItem: EnumValueMetadata = { ...initEnumValueMetadata, idEnumMetadata: editedItem.idEnumMetadata };
    setEditedValues(newItem);
  }

  const submitEditFormValues = (model: EnumValueMetadata) => {
    setEditedValues(null);
    if (model && model.idEnumValueMetadata > 0) {
              setEditedItem({ ...editedItem, values: editedItem.values.map(i=> (i.idEnumValueMetadata===model.idEnumValueMetadata)? model:i)});
            } else {
              setEditedItem({ ...editedItem, values: [...editedItem.values, model] });
            }
  }
  
  const handleDeleteValues = (model: EnumValueMetadata) => {
    setEditedItem((current) => { 
        var newItems = editedItem.values.filter(i => i !== model);
        return { ...current, values: newItems } 
    });
  };

    const handleCancelEditValues = () => {
        setEditedValues(null);
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
         {!editedValues && <form onSubmit={handleSubmit} className="form">
           <h1 className="h3 mb-3 fw-normal">Тип-перечисление</h1>
               
      <div className="m-3">                
        <label className="form-label" htmlFor="floatingInputName">Наименование</label>
        <input name="name" className="form-control" id="floatingInputName" placeholder="Наименование" autoComplete="off" value={editedItem.name} onChange={ handleInputChange } />
      </div>

      <div className="m-3">                
        <label className="form-label" htmlFor="floatingInputCaption">Отображаемое имя</label>
        <input name="caption" className="form-control" id="floatingInputCaption" placeholder="Отображаемое имя" autoComplete="off" value={editedItem.caption} onChange={ handleInputChange } />
      </div>
      <div className="m-3 card">    
        <div className="card-body"> 
            <div className="card-title">
                <h1 className="h4 fw-normal">Значения типа-перечисления</h1>
            </div>
            <div className="card-text">
                <Grid  onAdd={addValues} onEdit={setEditedValues} onDelete={handleDeleteValues} items={editedItem.values} props={[{Name:'idEnumValueMetadata', Caption: 'ID значения типа-перечисления', Visible: false, Type: 'int'}, {Name:'name', Caption: 'Наименование', Visible: true, Type: 'string'}, {Name:'caption', Caption: 'Отображаемое имя', Visible: true, Type: 'string'}]} />
            </div>
        </div>
      </div>
         <button className="w-50 btn btn-danger"  type='button' onClick={props.onCancel} >Отмена</button>
         <button className="w-50 btn btn-success" type='button' onClick={() => props.onSave(editedItem)} >Сохранить</button>
         </form>}

        { editedValues && <EnumValueMetadataEditForm model={editedValues} onSave={submitEditFormValues} onCancel={handleCancelEditValues} />}
    </div>
   );
 };



 export default EnumMetadataEditForm;
  