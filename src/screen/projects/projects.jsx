import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './projects.css';
import '../../root.css'
import Header from '../../components/header/header';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:7777/projects/show-all');
        setProjects(response.data.projects);
      } catch (error) {
        console.error('Erro ao carregar os projetos:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`http://localhost:7777/projects/delete/${projectId}`);
      setProjects(projects.filter(project => project.id !== projectId));
      console.log('Projeto excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir o projeto:', error);
    }
  };

  return (
   
    <div className="container">
         <Header/>
      <h1>Lista de Projetos</h1>
      {projects && projects.length > 0 ? (
        projects.map(project => (
          <div className="project" key={project.id}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p>{project.email}</p>
            <p>{project.technologies}</p>
            <p>{project.contactNumber}</p>
            <div className="images">
              {Array.isArray(project.images) && project.images.map(image => (
                <img className='img' key={image.id} src={`http://localhost:7777/${image.url}`} alt={image.alt} />
              ))}
            </div>
            <button className='btn' onClick={() => handleDeleteProject(project.id)}>Excluir</button>
          </div>
        ))
      ) : (
        <p>Nenhum projeto encontrado.</p>
      )}
    </div>
  );
};

export default ProjectList;
