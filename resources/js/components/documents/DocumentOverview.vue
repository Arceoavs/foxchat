<template>
  <div id="tree">
    <Tree id="myID" :custom-options="myCustomOptions" :custom-styles="myCustomStyles" :nodes="treeDisplayData">
    </Tree>
  </div>
</template>

<script>
import Tree from 'vuejs-tree'

export default {
  data() {
    return{
      treeDisplayData: [
      {
        id: 1,
        text: 'd.velop',
        definition: 'First node',
        depth: 2,
        checkable: true,
        selectable: true,
        expandable: true,
        disabled: true,
        tags: [42],
        state: {
          checked: false,
          expanded: true,
          selected: false,
        },

        nodes: [
          {
            id: 11,
            text: 'Abrechnungen',
            state: {
              expanded:true,
            },

            nodes: [
              {
                id: 111,
                text: 'Mai'
              },
              {
                id: 112,
                text: 'Juni'
              }
            ]
          },
        ],
      },
      {
        id: 2,
        text: 'BKK Linde',
        definition: 'Second node',
        depth: 2,
        tags: [43],
        expandable: true,
        state: {
          expanded: true,
        },

        nodes: [
          {
            id: 21,
            text: 'Versicherungsnachweis',
            state: {
              expanded: true,
            },

            nodes: [
              {
                id: 211,
                text: 'Mai',
              },
              {
                id: 212,
                text: 'Juni',
              }
            ]
          },],
      },]
    }
  },

  components: {
    Tree
  },
  methods: {
    getTree: function(myID) {
      for (let i = 0; i < this.$children.length; i++) {
        if (this.$children[i].$props.id == myID) return this.$children[i]
      }
    }
  },

  //Customizing part

  computed: {
  myCustomStyles() {
    return {
      tree: {
        height: 'auto',
        maxHeight: '300px',
        overflowY: 'visible',
        display: 'inline-block'
      },
      row: {
        width: '500px',
        cursor: 'pointer',
        child: {
          height: '35px'
        }
      },
      addNode: {
        class: 'custom_class',
        style: {
          color: '#007AD5'
        }
      },
      editNode: {
        class: 'custom_class',
        style: {
          color: '#007AD5'
        }
      },
      deleteNode: {
        class: 'custom_class',
        style: {
          color: '#EE5F5B'
        }
      },
      selectIcon: {
        class: 'custom_class',
        style: {
          color: '#007AD5'
        },
        active: {
          class: 'custom_class',
          style: {
            color: '#2ECC71'
          }
        }
      },
      text: {
        style: {},
        active: {
          style: {
            'font-weight': 'bold',
            color: '#2ECC71'
          }
        }
      }
    };
  },

  myCustomOptions() {
    return {
      treeEvents: {
        expanded: {
          state: true,
          fn: null,
        },
        collapsed: {
          state: false,
          fn: null,
        },
        selected: {
          state: false,
          fn: null,
        },
        checked: {
          state: true,
          fn: this.myCheckedFunction,
        }
      },
      events: {
        expanded: {
          state: true,
          fn: null,
        },
        selected: {
          state: false,
          fn: null,
        },
        checked: {
          state: false,
          fn: null,
        },
        editableName: {
          state: false,
          fn: null,
          calledEvent: null,
        }
      },
      addNode: { state: false, fn: null, appearOnHover: false },
      editNode: { state: true, fn: null, appearOnHover: true },
      deleteNode: { state: true, fn: null, appearOnHover: true },
      showTags: true,
    };
  }
},
};
</script>

<style>
</style>
