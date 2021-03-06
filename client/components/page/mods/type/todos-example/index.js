import { PropTypes } from 'lib/component';
import Page from 'client/components/page';
import Todos from 'client/components/todos';
import Loader from 'client/components/loader';
import Model from './model';
import styles from './styles.css';
import i18n from './i18n';

export default class PageTypeTodosExample extends Page {
  /**
   * @override
   */
  constructor(props) {
    super(props);

    /**
     * @type {Object}
     */
    this.state = {
      Todos: props.Todos,
      isLoading: false
    };
  }

  /**
   * @override
   */
  render() {
    let stls = this.styles;
    let state = this.state;

    return (
      <div className={stls.page}>
        <h1 className={stls.title}>{this.t('todos')}</h1>
        <Todos data={state.Todos} query={this.props.params} />
        <Loader isLoading={state.isLoading} />
      </div>
    );
  }
}

PageTypeTodosExample.propTypes = Object.assign({}, Page.propTypes, {
  Todo: PropTypes.object
});

PageTypeTodosExample.i18n = i18n;
PageTypeTodosExample.styles = styles;
PageTypeTodosExample.Model = Model;
