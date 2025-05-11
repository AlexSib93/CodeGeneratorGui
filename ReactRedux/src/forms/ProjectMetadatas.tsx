
import { useContext, useEffect, useState } from "react";
import { ProjectMetadata, initProjectMetadata } from "../models/ProjectMetadata";
import ProjectMetadataService from "../services/ProjectMetadataService";
import { Table } from "../components/Table";
import { Grid } from '../components/Grid';
import { setLoading, showErrorSnackbar, showSuccessSnackbar } from "../state/ui-state";
import { ContextApp } from "../state/state";
import ProjectMetadataEditForm from "./ProjectMetadataEditForm";

export interface IProjectMetadatasProps {
    items: ProjectMetadata[],
    autoFetch: boolean
}

export const ProjectMetadatas = (props: IProjectMetadatasProps) => {

    const { state, dispatch } = useContext(ContextApp);
    const [item, setItem] = useState<ProjectMetadata>(null);
    const [items, setItems] = useState<ProjectMetadata[]>(props.items);


    const LoadData = () => {
        dispatch(setLoading(true));
        ProjectMetadataService.getall().then((item) => {
            setItems(item);
        }).catch((err) => {
            dispatch(showErrorSnackbar(err));
        }).finally(() => {
            dispatch(setLoading(false));
        });
    }

    useEffect(() => {
        if (props.autoFetch) {
            LoadData();
        }

    }, [])


    const addItem = () => {
        var newItem = { ...initProjectMetadata };
        setItem(newItem);
    }

    const handleAdd = () => {
        setItem(null);
        LoadData();
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
        dispatch(setLoading(true));
        if (model && model.idProjectMetadata > 0) {
            ProjectMetadataService.put(model)
                .then((item) => {
                    dispatch(showSuccessSnackbar('Объект успешно сохранен'));
                    handleEdit(item);
                }).catch((err) => {
                    console.error('err', err);
                    dispatch(showErrorSnackbar(err.title));
                }).finally(() => {
                    dispatch(setLoading(false));
                });
        } else {
            ProjectMetadataService
                .post(model).then((item) => {
                    handleAdd();
                    dispatch(showSuccessSnackbar('Объект успешно создан'));
                }).catch((err) => {
                    console.error('err', err);
                    dispatch(showErrorSnackbar(err.title));
                }).finally(() => {
                    dispatch(setLoading(false));
                });
        }

    }

    const cancelEdit = () => {
        setItem(null);
    }

    return <div className="table-responsive" >
        {!item && <div>
            <div className="m-3 card">
                <div className="card-body">
                    <div className="card-title">
                        <h1 className="h4 fw-normal">Проект</h1>
                    </div>
                    <div className="card-text">
                        <Grid items={items} onEdit={setItem} onDelete={handleDelete} onAdd={addItem} enableFilters={true} props={[{ Name: 'idProjectMetadata', Caption: 'ID проекта', Visible: false, Type: 'int' }, { Name: 'name', Caption: 'Наименование', Visible: true, Type: 'string' }, { Name: 'description', Caption: 'Описание', Visible: true, Type: 'string' }, { Name: 'path', Caption: 'Путь', Visible: true, Type: 'string' }, { Name: 'dbConnectionString', Caption: 'Строка подключения к БД', Visible: true, Type: 'string' }, { Name: 'unitOfWork', Caption: 'Объект работы с БД (MockUnit или EfUnit )', Visible: true, Type: 'string' }, { Name: 'webApiHttpsPort', Caption: 'Порт для запуска WebApi', Visible: true, Type: 'int' }, { Name: 'devServerPort', Caption: 'Порт для запуска WebPackDevServer', Visible: true, Type: 'int' }]} />
                    </div>
                </div>
            </div>
        </div>}
        {item && <div>
            <ProjectMetadataEditForm model={item} onSave={submitEditForm} onCancel={cancelEdit} />
        </div>}
    </ div >
};




