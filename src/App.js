import React, { useState, useEffect } from 'react';
import api from './api';
import Header from './header';
import { 
    Container, 
    Table, 
    TableRow, 
    TableHead,
    TableBody,
    TableCell,  
    Dialog, 
    Button, 
    DialogTitle, 
    DialogContent,
    DialogContentText, 
    TextField,
    DialogActions } from '@material-ui/core';
import './style.css';


function App() {

    const [ lista, setLista ] = useState([]);
    const [ open, setOpen ] = useState(false);
    const [ nome, setNome] = useState('');
    const [ professor, setProfessor] = useState('');
    const [ semestre, setSemestre] = useState('');

    function loadData() {
        api.get('/materia').then((response) => {
            const itens = response.data;
            setLista(itens);
        })
    }

    useEffect(() => loadData(), []);

    const openModal = () => setOpen(true);

    const closeModal = () => setOpen(false);

    //Função para adicionar uma nova materia
    function addMateria() { 
        const name = nome;
        const teacher = professor;
        const half = semestre;
        api.post('/materia', { nome: name, professor: teacher, semestre: half }).then((response) => {
        setNome('');
        setProfessor(''); 
        setSemestre('');
        setOpen(false);
        loadData()
        })
     }

    //Função para excluir uma materia da lista.
     function deleteMateria(id) {
         api.delete(`/materia/${id}`).then((response) => {
            loadData()
         })
     }


    return (
        <>
        <Header />
        <Container maxWidth="lg" className="container">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nome da Materia</TableCell>
                        <TableCell>Professor</TableCell>
                        <TableCell>Semestre</TableCell>
                        <TableCell>Apagar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lista.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.nome}</TableCell>
                            <TableCell>{item.professor}</TableCell>
                            <TableCell>{item.semestre}</TableCell>
                            <TableCell>
                                <Button variant="outlined" size="small" color="secondary" onClick={() => deleteMateria(item.id)} >Apagar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button 
                onClick={openModal}
                variant="contained" 
                color="primary" 
                style={{marginTop: '20px'}}>
                Adicionar
            </Button>
            </Container>
            <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth="sm">
                <DialogTitle id="form-dialog-title">Nova Materia</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Digite a materia que gostaria adicionar.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nome"
                        label="Materia"
                        type="text"
                        fullWidth
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="Professor"
                        label="Professor"
                        type="text"
                        fullWidth
                        value={professor}
                        onChange={e => setProfessor(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="semestre"
                        label="Semestre"
                        type="number"
                        fullWidth
                        value={semestre}
                        onChange={e => setSemestre(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={addMateria} color="primary">
                        Salvar
                    </Button>
                 </DialogActions>
            </Dialog>
        </>
    );

}

export default App;
