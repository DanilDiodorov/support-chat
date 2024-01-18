import { useSelector } from 'react-redux'
import { ProfilePhoto } from 'shared'
import { selectCurrentUser } from '../model'
import { useEffect, useState } from 'react'

export const OperatorPhoto = ({ status, size }) => {
    const user = useSelector(selectCurrentUser)
    const [image, setImage] = useState(null)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/file/image?id=${user.id}`)
            .then((response) => response.blob())
            .then((blob) => {
                const imageUrl = URL.createObjectURL(blob)
                setImage(imageUrl)
            })
    }, [user])

    if (user.avatar) {
        return (
            <ProfilePhoto
                name={
                    user.lastName.toUpperCase() +
                    ' ' +
                    user.firstName.toUpperCase()
                }
                url={image}
                size={size}
                status={status}
            />
        )
    } else {
        return (
            <ProfilePhoto
                name={
                    user.lastName.toUpperCase() +
                    ' ' +
                    user.firstName.toUpperCase()
                }
                size={size}
                status={status}
            />
        )
    }
}
