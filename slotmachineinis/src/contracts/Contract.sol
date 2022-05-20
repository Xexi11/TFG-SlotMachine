pragma solidity 0.8.14 || 0.4.17;


contract Test{
    uint public saldo;

    function TestContract(uint saldoInicial)public {
        saldo = saldoInicial;
    }
    function ingresar (uint x)public {
        saldo += x;
    }
    function retirar (uint x)public {
        saldo -= x;
    }
    function getSaldo() private view returns (uint retVal){
        return saldo;
    }

}