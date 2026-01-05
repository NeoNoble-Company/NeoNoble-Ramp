import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const apiService = {
  // Get all slides
  getSlides: async () => {
    try {
      const response = await axios.get(`${API}/pitch-deck/slides`);
      return response.data;
    } catch (error) {
      console.error('Error fetching slides:', error);
      throw error;
    }
  },

  // Get company info
  getCompanyInfo: async () => {
    try {
      const response = await axios.get(`${API}/pitch-deck/company-info`);
      return response.data;
    } catch (error) {
      console.error('Error fetching company info:', error);
      throw error;
    }
  },

  // Get deck metadata
  getMetadata: async () => {
    try {
      const response = await axios.get(`${API}/pitch-deck/metadata`);
      return response.data;
    } catch (error) {
      console.error('Error fetching metadata:', error);
      throw error;
    }
  },

  // Export as PowerPoint
  exportPPTX: async () => {
    try {
      const response = await axios.get(`${API}/pitch-deck/export/pptx`, {
        responseType: 'blob'
      });
      
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'NeoNoble_PitchDeck.pptx';
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match) filename = match[1];
      }
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Error exporting PPTX:', error);
      throw error;
    }
  },

  // Export as PDF
  exportPDF: async () => {
    try {
      const response = await axios.get(`${API}/pitch-deck/export/pdf`, {
        responseType: 'blob'
      });
      
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'NeoNoble_PitchDeck.pdf';
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match) filename = match[1];
      }
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Error exporting PDF:', error);
      throw error;
    }
  }
};

export default apiService;
