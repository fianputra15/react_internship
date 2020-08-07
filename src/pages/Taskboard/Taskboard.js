import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import React, { useState } from 'react';
import { infoColor, warningColor } from '../../styleVariables';
import reorder, { reorderQuoteMap } from './reorder';

import Column from './Column';
import { makeStyles } from '@material-ui/core/styles';
import { mockTaskboard } from '../../utils/mock';

const useStyles = makeStyles(theme => ({
  taskboard: {
    overflowX: 'auto',
    overflowY: 'hidden',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 56px)'
    },
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100vh - 64px)'
    }
  },
  wrapper: {
    width: '280px',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(1) / 2,
    paddingLeft: theme.spacing(1) / 2,
    boxSizing: 'border-box',
    display: 'inline-block',
    verticalAlign: 'top',
    height: '100%'
  },
  list: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
    whiteSpace: 'normal',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: theme.shape.borderRadius
  },
  header: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    letterSpacing: '0.02rem',
    padding: theme.spacing(1),
    margin: 0,
    fontWeight: 500,
    textTransform: 'uppercase',
    fontSize: '12px'
  },
  task: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.shadows[1],
    color: theme.palette.text.primary,
    background: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '&:last-child': {
      marginBottom: 0
    },
    '&:hover': {
      cursor: 'grab'
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      border: '4px solid transparent',
      top: 0,
      borderTopWidth: '12px',
      borderBottomColor: 'transparent',
      right: '6px'
    }
  },
  success: {
    '&::after': {
      borderTopColor: theme.palette.secondary.main,
      borderRightColor: theme.palette.secondary.main,
      borderLeftColor: theme.palette.secondary.main
    }
  },
  info: {
    '&::after': {
      borderTopColor: infoColor,
      borderRightColor: infoColor,
      borderLeftColor: infoColor
    }
  },
  warning: {
    '&::after': {
      borderTopColor: warningColor,
      borderRightColor: warningColor,
      borderLeftColor: warningColor
    }
  },
  danger: {
    '&::after': {
      borderTopColor: theme.palette.secondary.main,
      borderRightColor: theme.palette.secondary.main,
      borderLeftColor: theme.palette.secondary.main
    }
  },
  cards: {
    position: 'relative',
    padding: `0 ${theme.spacing(1)}px ${theme.spacing(1)}px`,
    boxSizing: 'border-box',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto'
  }
}));

const Taskboard = () => {
  const classes = useStyles();
  const [columns, setColumns] = useState(mockTaskboard);
  const [ordered, setOrdered] = useState(Object.keys(mockTaskboard));

  const onDragEnd = result => {
    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === 'COLUMN') {
      const orderedList = reorder(ordered, source.index, destination.index);
      setOrdered(orderedList);
      return;
    }

    const data = reorderQuoteMap({
      quoteMap: columns,
      source,
      destination
    });

    setColumns(data.quoteMap);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="taskboard" type="COLUMN">
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={classes.taskboard}
          >
            {ordered.map((key, index) => (
              <Column
                key={key}
                index={index}
                title={key}
                tasks={columns[key]}
              />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Taskboard;
