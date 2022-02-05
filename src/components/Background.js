import classes from './Background.module.css';

export default function Background(props) {
    return(
        <div className={classes.background} onClick={props.onCancel}></div>
    );
}