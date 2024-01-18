import { ProfilePhoto } from 'shared'
import styled from 'styled-components'

export const OperatorCard = ({ operator, value, setValue }) => {
    return (
        <Main
            onClick={() =>
                setValue({
                    id: operator.id,
                    fullName: operator.firstName + ' ' + operator.lastName,
                })
            }
            checked={value?.id === operator.id ? true : false}
        >
            <ProfilePhoto
                name={operator.firstName + ' ' + operator.lastName}
                size="60px"
                status={operator.status}
                style={{ marginLeft: '10px' }}
            />
            <InfoBlock>
                <Name>{operator.firstName + ' ' + operator.lastName}</Name>
                <Text>{operator.status}</Text>
            </InfoBlock>
        </Main>
    )
}

const Main = styled.div`
    display: flex;
    width: 100%;
    gap: 10px;
    align-items: center;
    padding: 15px 0px;
    width: 100%;
    background-color: ${({ theme, checked }) =>
        checked ? theme.colors.grey : 'white'};
    border-radius: ${({ theme }) => theme.sizes.borderRadius};

    &:hover {
        cursor: pointer;
        background-color: ${({ theme, checked }) =>
            checked ? theme.colors.grey : '#f0f0f0'};
    }
`

const InfoBlock = styled.div`
    width: calc(100% - 80px);
    display: flex;
    flex-direction: column;
    gap: 3px;
    position: relative;
`

const Name = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 18px;
`

const Text = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    color: grey;
`
