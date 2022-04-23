import React from 'react';
import Directory from '../../components/directory/directory.component';
import categories from '../../components/categories/categories';


const Home = () => {
    return (
        <div>
            <Directory categories={categories} />
        </div>
    );
}

export default Home;
