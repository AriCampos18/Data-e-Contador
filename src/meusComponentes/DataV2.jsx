import {useState, useEffect} from 'react';

//useEffect é um hook que permite gerenciar o ciclo de vida
// do componente quando ele é desenvolvido utilizando
// a sintaxe JSX

/*
a sintaxe do useEffect

useEffect( function () {

    return function () <-- willUnmount
}, [] didMount //executa uma vez só )
   [lista de valores observados] didUpdate para cada valor que foi atualizado 
*/

export default function DataV2(props){
    const [dataAtual, setDataAtual] = useState("");

    function pegaDataDe(timeZone){
        const dataAtual = new Date();

        let timeZoneFromDB = parseInt(timeZone);  /*converte a timeZone recebida (presumivelmente uma string) para um número inteiro.*/

        let diferencaTempo = timeZoneFromDB * 60 + dataAtual.getTimezoneOffset();
        /*diferencaTempo calcula a diferença em minutos entre o fuso horário do banco de dados e o fuso horário local do usuário*/
        /*getTimezoneOffset retorna a diferença em minutos entre a hora UTC e a hora local*/

        let milisegundos = parseInt(dataAtual.getTime() + (diferencaTempo * 60 * 1000));
        /*calcula a hora correta em milissegundos, considerando a diferença de fuso horário.*/

        const data = new Date(milisegundos);  /*tranforma o milissegundos em uma data valida*/
        return data
    }

    //exemplo de didMount
    useEffect(()=>{
        setDataAtual(new Date().toLocaleString());
        return ()=>{} //willUnmount
    }, [])

    //exemplo de didUpdate
    useEffect(()=>{    /*setTimeout é usado para agendar a atualização da dataAtual a cada 1000 milissegundos (ou 1                                                     segundo).*/
        setTimeout(()=>{
            setDataAtual(pegaDataDe(props.timeZone).toLocaleString()); 
        },1000);
    },[dataAtual]); //<-- O que observar para executar a função a cada atualização do que está sendo observado            

    return (
        <h1>{props.texto || " "}{dataAtual}</h1>
    );
}