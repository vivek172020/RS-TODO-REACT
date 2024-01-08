import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import Button from './Button'
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../Reducer/TodoSlice';
import { v4 as uuid } from 'uuid';
import { format } from 'date-fns';

const dropIn = {
    hidden: {
        opacity: 0,
        transform: 'scale(0.9)',
    },
    visible: {
        transform: 'scale(1)',
        opacity: 1,
        transition: {
            duration: 0.1,
            type: 'spring',
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        transform: 'scale(0.9)',
        opacity: 0,
    },
};

export default function TodoModal({ type, modalOpen, setModalOpen, todo }) {

    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('incomplete');

    useEffect(() => {
        if (type === 'update' && todo) {
            setTitle(todo.title);
            setStatus(todo.status);
        } else {
            setTitle('');
            setStatus('incomplete');
        }
    }, [type, todo, modalOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === '') {
            // toast.error('Please enter a title');
            return;
        }
        if (title && status) {
            if (type === 'add') {
                dispatch(
                    addTodo({
                        id: uuid(),
                        title,
                        status,
                        time: format(new Date(), 'p, MM/dd/yyyy'),
                    })
                );
                // toast.success('Task added successfully');
            }
            if (type === 'update') {
                if (todo.title !== title || todo.status !== status) {
                    dispatch(updateTodo({ ...todo, title, status }));
                    // toast.success('Task Updated successfully');
                } else {
                    // toast.error('No changes made');
                    return;
                }
            }
            setModalOpen(false);
        }

    }
    return (
        <>
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        className='wrapper'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className='container2'
                            variants={dropIn}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <motion.div
                                className='closeButton'
                                onKeyDown={() => setModalOpen(false)}
                                onClick={() => setModalOpen(false)}
                                role="button"
                                tabIndex={0}
                                // animation
                                initial={{ top: 40, opacity: 0 }}
                                animate={{ top: -10, opacity: 1 }}
                                exit={{ top: 40, opacity: 0 }}
                            >
                                <MdOutlineClose />
                            </motion.div>

                            <form
                                className='form'
                                onSubmit={(e) => handleSubmit(e)}>
                                <h1
                                    className='formTitle'
                                >
                                    {type === 'add' ? 'Add' : 'Update'} TODO
                                </h1>
                                <label htmlFor="title">
                                    Title
                                    <input
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </label>
                                <label htmlFor="type">
                                    Status
                                    <select
                                        id="type"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="incomplete">Incomplete</option>
                                        <option value="complete">Completed</option>
                                    </select>
                                </label>
                                <div
                                    className='buttonContainer'
                                >
                                    <Button type="submit" variant="primary">
                                        {type === 'add' ? 'Add Task' : 'Update Task'}
                                    </Button>
                                    <Button className='button' variant="secondary" onClick={() => setModalOpen(false)}>
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
