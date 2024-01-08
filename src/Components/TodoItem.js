import { format } from 'date-fns';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../Reducer/TodoSlice';
import CheckButton from './CheckButton';
import TodoModal from './TodoModal';

const child = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

function TodoItem({ todo }) {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    useEffect(() => {
        if (todo.status === 'complete') {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, [todo.status]);

    const handleCheck = () => {
        setChecked(!checked);
        dispatch(
            updateTodo({ ...todo, status: checked ? 'incomplete' : 'complete' })
        );
    };

    const handleDelete = () => {
        dispatch(deleteTodo(todo.id));
        toast.success('Todo Deleted Successfully');
    };

    const handleUpdate = () => {
        setUpdateModalOpen(true);
    };

    return (
        <>
            <motion.div className='item'
                variants={child}>
                <div className='todoDetails'
                >
                    <CheckButton checked={checked} handleCheck={handleCheck} />
                    <div className='texts'
                    >
                        <p className={`todoText ${checked ? 'todoText--completed' : ''}`}
                        >
                            {todo.title}
                        </p>
                        <p className='time'>
                            {format(new Date(todo.time), 'p, MM/dd/yyyy')}
                        </p>
                    </div>
                </div>
                <div className='todoActions'
                >
                    <div className='icon'
                        onClick={() => handleDelete()}
                        onKeyDown={() => handleDelete()}
                        tabIndex={0}
                        role="button"
                    >
                        <MdDelete />
                    </div>
                    <div className='icon'
                        onClick={() => handleUpdate()}
                        onKeyDown={() => handleUpdate()}
                        tabIndex={0}
                        role="button"
                    >
                        <MdEdit />
                    </div>
                </div>
            </motion.div>
            <TodoModal
                type="update"
                modalOpen={updateModalOpen}
                setModalOpen={setUpdateModalOpen}
                todo={todo}
            />
        </>
    );
}

export default TodoItem;
