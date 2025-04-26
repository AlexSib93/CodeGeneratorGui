
import { useEffect,useState } from "react";
import { ProjectMetadata,  initProjectMetadata } from "../models/ProjectMetadata";
import ProjectMetadataService from "../services/ProjectMetadataService";
import { Table } from "../components/Table";
import {Grid} from '../components/Grid';
import ProjectMetadataEditForm from "./ProjectMetadataEditForm";

export interface IProjectMetadatasProps
{
    items: ProjectMetadata[],
    autoFetch: boolean
}

export const ProjectMetadatas = (props: IProjectMetadatasProps) => {
    const [item, setItem] = useState<ProjectMetadata>(null);
    const [items, setItems] = useState<ProjectMetadata[]>(props.items);


    useEffect(() => {
        if (props.autoFetch) {
            ProjectMetadataService.getall().then((item) => {
                setItems(item);
            });
        }
    }, [])


    const addItem = () => {
        var newItem = { ...initProjectMetadata };
        setItem(newItem);
    }

    const handleAdd = (model: ProjectMetadata) => {
        setItems([...items, model]);
    };

    const handleEdit = (model: ProjectMetadata) => {
        var newItems = items.map(i => (i === item) ? model : i);
        setItems(newItems);
        setItem(null);
    };

    const handleDelete = (model: ProjectMetadata) => {
        var newItems = items.filter(i => i !== model);
        setItems(newItems);
        ProjectMetadataService.delete(model.idProjectMetadata);
    };

    const submitEditForm = (model: ProjectMetadata) => {
        setItem(null);
        if (model && model.idProjectMetadata > 0) {
            ProjectMetadataService.put(model).then((item) => {
                handleEdit(item);
            });
        } else {
            ProjectMetadataService.post(model).then((item) => {
                handleAdd(item);
            });
        }
    }

    const cancelEdit = () => {
        setItem(null);
    }

    return <div className="table-responsive" >
        { !item && <div>
                  <div className="m-3 card">    
        <div className="card-body"> 
            <div className="card-title">
                <h1 className="h4 fw-normal">Проект</h1>
            </div>
            <div className="card-text">
                <Grid items={items} onEdit={setItem} onDelete={handleDelete} onAdd={addItem}  enableFilters={true} props={[{Name:'idProjectMetadata', Caption: 'ID проекта', Visible: false, Type: 'int'}, {Name:'name', Caption: 'Наименование', Visible: true, Type: 'string'}, {Name:'description', Caption: 'Описание', Visible: true, Type: 'string'}, {Name:'path', Caption: 'Путь', Visible: true, Type: 'string'}, {Name:'dbConnectionString', Caption: 'Строка подключения к БД', Visible: true, Type: 'string'}, {Name:'unitOfWork', Caption: 'Объект работы с БД (MockUnit или EfUnit )', Visible: true, Type: 'string'}]} />
            </div>
        </div>
      </div>
        </div>}
             {item && <div>
                <ProjectMetadataEditForm model={item} onSave={submitEditForm} onCancel={cancelEdit} />
            </div> }
        </ div >
    };

  


