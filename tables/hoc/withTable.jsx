import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { changeQueryParameters, getPaginationData } from 'utilities/helpers';

const withTable = Component => {
  const enhancedFunction = props => {
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selected, setSelected] = useState([]);
    const [selectedRecord, setSelectRecord] = useState([]);
    const [isInfoModalOpen, setInfoModal] = useState(false);

    const paginationOptions = [5, 10, 20, 50];

    const location = useLocation();
    const navigate = useNavigate();

    const [sorting, setSorting] = useState({
      order: 'asc',
      orderBy: 'id',
    });

    useEffect(() => {
      if (selected && selected.length === 0) {
        setSorting(prevObj => ({
          ...prevObj,
          selected: new Map([]),
        }));
      }
    }, [selected]);

    const handleRequestSort = (event, property) => {
      const orderBy = property;
      let order = 'desc';

      if (sorting.orderBy === property && sorting.order === 'desc') {
        order = 'asc';
      }
      setSorting(prevObj => ({
        ...prevObj,
        order,
        orderBy,
      }));
    };

    const handleSelectAllClick = (e, data = []) => {
      if (e?.target?.checked) {
        const newSelected = data.map(row => row?.id);
        setSelected(newSelected);

        return;
      }

      setSelected([]);
    };

    const handleClick = (event, itemTemp) => {
      const newSelected = [...selected];

      const index = newSelected.indexOf(itemTemp.id);
      if (index === -1) {
        newSelected.push(itemTemp.id);
      } else {
        newSelected.splice(index, 1);
      }
      setSelected([...newSelected]);
    };

    // get complete record for popups
    const handleSelectAllRecords = (e, data = []) => {
      if (e?.target?.checked) {
        setSelectRecord(data);
        return;
      }

      setSelectRecord([]);
    };
    const handleSelectRecord = (event, itemTemp) => {
      const newSelectedData = [...selectedRecord];
      const index = newSelectedData.indexOf(itemTemp);
      if (index === -1) {
        newSelectedData.push(itemTemp);
      } else {
        newSelectedData.splice(index, 1);
      }

      setSelectRecord([...newSelectedData]);
    };
    //

    const handleChangePage = async (event, page) => {
      const { query } = getPaginationData(location);
      navigate({
        pathname: location.pathname,
        search: changeQueryParameters(query, { page }),
      });
    };

    const handleChangeRowsPerPage = async event => {
      const rowsPerPage = +event.target.value;
      const { query } = getPaginationData(location);
      navigate({
        pathname: location.pathname,
        search: changeQueryParameters(query, {
          rows_per_page: rowsPerPage,
          page: 0,
        }),
      });
    };

    const deleteToggle = useCallback(() => {
      setDeleteModal(!deleteModal);
    }, [deleteModal]);

    const editToggle = useCallback(() => {
      setEditModal(!editModal);
    }, [editModal]);

    const infoToggle = useCallback(
      () => setInfoModal(!isInfoModalOpen),
      [isInfoModalOpen]
    );

    const { order, orderBy } = sorting;

    const isSelected = id => selected?.includes(id) || false;

    const { page, rowsPerPage } = getPaginationData(location);
    const numSelected = selected.length;
    const tableProps = {
      selected,
      setSelected,
      selectedRecord,
      setSelectRecord,
      order,
      orderBy,
      pageNumber: page,
      rowsPerPage,
      handleRequestSort,
      handleSelectAllClick,
      handleClick,
      handleSelectRecord,
      handleSelectAllRecords,
      handleChangePage,
      handleChangeRowsPerPage,
      isSelected,
      deleteToggle,
      editToggle,
      infoToggle,
      editModal,
      isInfoModalOpen,
      deleteModal,
      paginationOptions,
      numSelected,
    };

    return <Component tableProps={tableProps} {...props} />;
  };

  return enhancedFunction;
};

export default withTable;
