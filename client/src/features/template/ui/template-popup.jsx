import { useState } from 'react'
import { Button, PopupLayout, TextareaField } from 'shared'
import styled from 'styled-components'
import { useAddTemplate } from '../hooks/use-add-template'
import { useUpdateTemplate } from '../hooks/use-update-template'
import { useDeleteTemplate } from '../hooks/use-delete-template'

export const TemplatePopup = ({ active, setActive, defaultValue, id }) => {
    const [text, setText] = useState(defaultValue)
    const addTemplateMutation = useAddTemplate()
    const updateTemplateMutation = useUpdateTemplate()
    const deleteTemplateMutation = useDeleteTemplate()

    const handleConfirm = () => {
        if (!id) {
            addTemplateMutation.mutate({ text })
            setText('')
        } else {
            updateTemplateMutation.mutate({ id, text })
        }
        setActive(false)
    }

    const handleDelete = () => {
        deleteTemplateMutation.mutate({ id })
        setActive(false)
    }

    const deleteButton = (
        <Button
            color="danger"
            buttonProps={{ style: { width: '100px' }, onClick: handleDelete }}
        >
            Удалить
        </Button>
    )

    return (
        <PopupLayout
            title="Добавить готовое сообщение"
            active={active}
            setActive={setActive}
            disabled={text ? false : true}
            onConfirm={handleConfirm}
            isLoading={
                addTemplateMutation.isPending ||
                updateTemplateMutation.isPending
            }
            buttons={id && deleteButton}
        >
            <Content>
                <TextareaField
                    label="Введите текст"
                    inputProps={{
                        rows: 10,
                        value: text,
                        onChange: (e) => setText(e.target.value),
                    }}
                />
            </Content>
        </PopupLayout>
    )
}

const Content = styled.div``
