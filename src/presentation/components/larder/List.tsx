const list = [
  {
    name: 'fruit',
    items: [
      {
        name: 'apples',
        quantity: Math.floor(Math.random() * 20),
        unit: Math.random() > 0.5 ? 'g' : '',
      },
      {
        name: 'bannanas',
        quantity: Math.floor(Math.random() * 20),
        unit: Math.random() > 0.5 ? 'g' : '',
      },
      {
        name: 'pears',
        quantity: Math.floor(Math.random() * 20),
        unit: Math.random() > 0.5 ? 'g' : '',
      },
    ],
  },
  {
    name: 'tinned',
    items: [
      {
        name: 'beans',
        quantity: 1,
        unit: '',
      },
    ],
  },
  {
    name: 'frozen',
    items: [

    ],
  },
];

const List = ({ props, listeners }) => (
  <div>
    <form onSubmit={listeners.add}>
      <md-field>
        <label for="larder_search_add">Add...</label>
        <md-input id="larder_search_add" value={props.addValue} onInput={listeners.addChange}/>
        <md-button type="submit" class="md-primary">
          <md-icon>add</md-icon>
          <span class="md-medium-hide">Add</span>
        </md-button>
      </md-field>
    </form>

    <div class="md-layout">
      {list.map((category) => (
        <div class="md-layout-item md-size-25 md-medium-size-50 md-xsmall-size-100" style="margin-bottom: 1rem;">
          <md-card>
            <md-card-header>
              <div class="md-title">
                {category.name}
              </div>
            </md-card-header>
            <md-card-content>
              <md-list class="md-double-line">
                {category.items.map((item) => (
                  <md-list-item onClick={(e) => { e.preventDefault(); listeners.view(item.name); }} href={`/larder/view/${item.name}`}>
                    <div class="md-list-item-text">
                      <span>{item.name}</span>
                      <span>{`${item.quantity}${item.unit}`}</span>
                    </div>
                  </md-list-item>
                ))}
              </md-list>
            </md-card-content>
          </md-card>
        </div>
      ))}
    </div>
  </div>
);

export default {
  inject: [ 'router' ],
  data() {
    return {
      add: '',
    };
  },
  render() {
    const handleAddChange = (value) => {
      this.add = value;
    };
    const handleAdd = (e) => {
      e.preventDefault();
      this.router.history.push(`/larder/add?name=${encodeURIComponent(this.add)}`);
    };
    const handleView = (id) => {
      this.router.history.push(`/larder/view/${id}`);
    };

    return (<List addValue={this.add} onView={handleView} onAdd={handleAdd} onAddChange={handleAddChange}/>);
  },
};
