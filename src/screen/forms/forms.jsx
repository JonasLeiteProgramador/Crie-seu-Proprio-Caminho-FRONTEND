import React, { useState } from 'react';
import './forms.css'
import axios from 'axios';
import Header from '../../components/header/header';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    email: '',
    technologies: '',
    contactNumber: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { title, description, email, technologies, contactNumber } = formData;
      const projectResponse = await axios.post('http://localhost:7777/projects/create', {
        title,
        description,
        email,
        technologies,
        contactNumber,
      });

      const projectId = projectResponse.data.project.id; 

      const formDataImage = new FormData();
      formDataImage.append('image', selectedFile);
      formDataImage.append('projectId', projectId); 
      
      await axios.post(`http://localhost:7777/images/create/${projectId}`, formDataImage, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setFormData({
        title: '',
        description: '',
        email: '',
        technologies: '',
        contactNumber: '',
      });

      setSelectedFile(null);

      alert('Projeto criado com sucesso!');
      
    } catch (error) {
      console.error('Erro ao criar o projeto:', error);
      alert('Erro ao criar o projeto. Verifique o console para mais detalhes.');
    }
  };

  return (
    
    <div className='project-form'>
        <Header/>
      <h2>Criar Novo Projeto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required  placeholder='Digite o titulo do seu projeto'/>
        </div>
        <div>
          <label>Descrição:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required  placeholder='Digite a descrição do seu projeto'/>
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required  placeholder='Digite o email de contato'/>
        </div>
        <div>
          <label>Tecnologias:</label>
          <input type="text" name="technologies" value={formData.technologies} onChange={handleChange} required  placeholder='Digite as  tecnologias utilizadas'/>
        </div>
        <div>
          <label>Número de Contato:</label>
          <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required placeholder='Digite um numero de contato'/>
        </div>
        <div>
          <label>Imagem:</label>
          <input type="file" name="image" onChange={handleFileChange }/>
          {selectedFile && <p>Nome do arquivo: {selectedFile.name}</p>}
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default ProjectForm;
