import './button.styles.scss';

const Button = ({ name, type }) => {
    return (
       <div>
          <button className="gene-btn" type={type}>
             {name}
          </button>
       </div>
    );
};

export default Button