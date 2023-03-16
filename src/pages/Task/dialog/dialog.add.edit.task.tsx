import Input from 'antd/es/input';
import Modal from 'antd/es/modal';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TypeDialog } from '../../../enums/type.dialog';
import { taskActions } from '../actions/task.action';
import { DataDialogProps } from '../models/data.dialog.props';
import { Task } from '../models/task';
import { FontSizeOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { useAppDispatch } from '../../../app/hooks';
import Checkbox from 'antd/es/checkbox';


  function DialogAddEditTask() {
    const dispatch = useAppDispatch(); 
    const openModalAddEdit  = useSelector((state: any) => state.tasksReducer.openModalAddEdit as DataDialogProps<Task>);
    const [inputs, setInputs] = React.useState<Task>(openModalAddEdit?.select??new Task());
    const [isSubmit, setIsSubmit] = React.useState<boolean>(false);
    
    useEffect(() => {
         setInputs(openModalAddEdit?.select)
         setIsSubmit(false);
    }, [openModalAddEdit]);
  
    function handleChange(e:any) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleChangeCheck(e:any) {
        const { name, checked } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: checked }));
    }

    const onSubmit = () => {
        setIsSubmit(true);
        if (!inputs.title) return;
        if(openModalAddEdit?.type ===TypeDialog.add){
            dispatch(taskActions.add(inputs));
        }
        if(openModalAddEdit?.type ===TypeDialog.edit){
            dispatch(taskActions.edit(inputs));
        }
    };

    const handleCancel = () => {
        dispatch(taskActions.closeModalAddEdit());
    };

    return (
        <Modal title={openModalAddEdit.type  === TypeDialog.add? "Agregar" : `Editar: ${inputs.title}`} 
        open={openModalAddEdit?.open??false}  okText="Guardar" cancelText="Cancelar" confirmLoading={openModalAddEdit.loading} onOk={onSubmit} onCancel={handleCancel}>
            <Input disabled={openModalAddEdit.loading} id="title" name="title" placeholder="Título"  value={inputs.title || ""} onChange={handleChange} 
                prefix={<FontSizeOutlined />} status={(!inputs?.title) && isSubmit ? "error": ""} />
                <br /> <br />
            <TextArea disabled={openModalAddEdit.loading} id="description" name="description" rows={4} value={inputs.description || ""}  onChange={handleChange} placeholder="Descripción" maxLength={200}  />        
            <Checkbox name="completed" checked={inputs.completed } onChange={handleChangeCheck}> {inputs.completed ? "Completa": "Incompleta"}</Checkbox>
        </Modal>
    );
  }
    
  export { DialogAddEditTask };
  
