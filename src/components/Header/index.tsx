// import { useState } from 'react';
import logoImg from '../../assets/logo.svg';
import { Container, Content } from './styles';

interface HeaderProps {
    onOpenNewTransactionModal: () => void;//falando que é uma função com retorno vazio
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {


    return (
        <Container>
            <Content>
                <img src={logoImg} alt="dt money"></img>
                <button type="button" onClick={onOpenNewTransactionModal}>
                    Nova transação
                </button>
            </Content>
        </Container>
    );
};