import React, { useEffect, useState } from "react";
// Informação do contrato
import registry from "../../contracts/registry.contract";
// Configuração para requisições na rede
import web3 from "../../utils/web3";
import "./styles.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";

function Home() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfSearch, setCpfSearch] = useState("");
  const [owner, setOwner] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [people, setPeople] = useState([]);
  const [personInfo, setPersonInfo] = useState(null);
  const [loadingInsert, setLoadingInsert] = useState(false);

  // Pega dono do contrato
  const getOwner = async () => {
    try {
      const _owner = await registry.methods.owner().call();

      setOwner(_owner);
    } catch (error) {
      console.log(error);
    }
  };
  // Pega pessoas cadastradas no contrato
  const getPeople = async () => {
    try {
      const response = await registry.methods.getAllPeople().call();
      console.log(response);
      setPeople(response);
    } catch (error) {
      console.log(error);
    }
  };
  // Busca pessoa por cpf
  const handleSearchPerson = async (e) => {
    e.preventDefault();
    try {
      // const response = await registry.methods
      //   .findByCpf(cpfSearch)
      //   .call();
      for (let i = 0; i < people.length; i++) {
        console.log(people[i].cpf);
        if (people[i].cpf === cpfSearch) {
          setPersonInfo(people[i]);
          break;
        }
        else{
          setPersonInfo(null);
        }
      }
     
   
    } catch (error) {
      setPersonInfo(null);
      console.log(error);
    }
  };
  // Cadastra nova pessoa
  const handleRegistry = async (e) => {
    e.preventDefault();
    try {
      setLoadingInsert(true);

      const contas = await web3.eth.getAccounts();
      const response = await registry.methods
        .registry([name, parseInt(cpf), parseInt(birthdate)])
        .send({ from: contas[0] });

      console.log(response);
      setLoadingInsert(false);
    } catch (error) {
      setLoadingInsert(false);
      alert("Ops, erro no cadastro de pessoa");
      console.log(error);
    }
  };
  // Busca dono do contrato e lista de pessoas no inicio da página e quando um novo dado é inserido
  useEffect(() => {
    getOwner();
    getPeople();
  }, [loadingInsert]);
  return (
    <div>
      <h1>Endereço do dono do contrato: {owner}</h1>
      <Divider />
      <h2>Listagem de Pessoas Registradas</h2>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Nome</TableCell>
              <TableCell align="right">CPF</TableCell>
              <TableCell align="right">Data de Nascimento</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((person, idx) => (
              <TableRow
                key={idx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {idx + 1}
                </TableCell>
                <TableCell align="right">{person.name}</TableCell>
                <TableCell align="right">{person.cpf}</TableCell>
                <TableCell align="right">{person.birthdate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </TableContainer>
      {!(people.length > 0) ? <h4>Nenhuma pessoa cadastrada</h4> : null}

      <br />
      <br />
      <Divider />

      <form onSubmit={handleRegistry}>
        <div className="content">
          <h2>Cadastro de pessoa</h2>
          <TextField id="outlined-basic" label="Nome" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
          <br />
          <br />
          <TextField id="outlined-basic" label="CPF" variant="outlined" type="number" value={cpf} onChange={(e) => setCpf(e.target.value)} />
          <br />
          <br />
          {/* tipe number */}
          <TextField id="outlined-basic" label="Data de Nascimento" variant="outlined"  type="number" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
          <br />
          <br />
          <Button variant="contained" type="submit">Cadastrar</Button>
          {loadingInsert ? (
            <h5>Processando cadastro de Pessoas...</h5>
          ) : (
            <>
              <br />
              <br />
            </>
          )}
        </div>
      </form>

      <Divider />
      <form onSubmit={handleSearchPerson}>
        <div className="content">
          <h2>Buscar por cpf</h2>

          <TextField id="outlined-basic" label="CPF" variant="outlined" value={cpfSearch} onChange={(e) => setCpfSearch(e.target.value)} />

          <br />
          <br />
          <Button variant="contained" type="submit">Buscar</Button>
          
          {personInfo ? (
            <div>
              <p>
                <b>Nome:</b> {personInfo.name}
              </p>
              <p>
                <b>CPF:</b> {personInfo.cpf}
              </p>
              <p>
                <b>Data de nascimento:</b> {personInfo.birthdate}
              </p>
            </div>
          ) : <h4>Não encontrado</h4>}
        </div>
      </form>

      <br />
      <br />
    </div>
  );
}

export default Home;