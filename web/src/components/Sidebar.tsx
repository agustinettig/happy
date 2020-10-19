import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import localIcon from '../images/local.svg';

import '../styles/components/sidebar.css';
import { useHistory } from 'react-router-dom';

function Sidebar() {
    const { goBack } = useHistory();
    return (
        <aside>
        <img src={localIcon} alt="Happy" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>
    );
}

export default Sidebar;