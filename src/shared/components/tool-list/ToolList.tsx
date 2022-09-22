import {
  Box,
  Button,
  Icon,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { MouseEvent, useEffect, useState } from 'react';
import { useFilterContext } from '../../contexts';

import { Environment } from '../../environment';

interface IToolList {
  searchText?: string | null;
  changeTextSearch?: (newText: string) => void;
  showSearchText?: boolean;
  showFilter?: boolean;
  onClickFilter?: (newSize: string) => void;
}

const options = [
  'Filtro',
  'Tamanho P',
  'Tamanho M',
  'Tamanho G',
  'Tamanho GG',
  'Tamanho Plus Size',
];

export const ToolList: React.FC<IToolList> = ({
  searchText = '',
  changeTextSearch,
  showSearchText = false,
  showFilter = false,
  onClickFilter,
}) => {
  const theme = useTheme();

  const { setFilterSize, filterSize } = useFilterContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [filterOptions, setFilterOptions] = useState(options);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuItemClick = (_: MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    setFilterSize(filterOptions[index]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setFilterSize('Filtro');
  }, []);

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display='flex'
      component={Paper}
      alignItems='center'
      flexDirection='row'
      height={theme.spacing(5)}
    >
      <Box display='flex' justifyContent='start'>
        {showSearchText && (
          <TextField
            value={searchText}
            onChange={(e) => changeTextSearch?.(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon>search</Icon>
                </InputAdornment>
              ),
            }}
            placeholder={Environment.INPUT_DE_BUSCA}
            size='small'
          />
        )}
      </Box>
      <Box flex={1} display='flex' justifyContent='end'>
        {showFilter && (
          <Button
            variant='contained'
            aria-haspopup='true'
            onClick={(e) => handleMenuClick(e)}
            aria-expanded={openMenu ? 'true' : undefined}
            aria-controls={openMenu ? 'basic-menu' : undefined}
            endIcon={<Icon>arrow_drop_down</Icon>}
          >
            {
              <Typography
                variant='button'
                overflow='hidden'
                whiteSpace='nowrap'
                textOverflow='ellipsis'
              >
                {options[selectedIndex]}
              </Typography>
            }
          </Button>
        )}
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          MenuListProps={{ 'aria-labelledby': 'lock-button', role: 'listbox' }}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === selectedIndex}
              onClick={(e) => handleMenuItemClick(e, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
};
