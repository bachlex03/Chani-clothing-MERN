'use client';

import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from './ui/select';
import { Button as SButton } from './ui/button';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from './ui/dialog';
import { ImageListItem } from '@mui/material';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

function not(a: readonly number[], b: readonly number[]) {
   return a.filter((value) => !b.includes(value));
}

function intersection(a: readonly number[], b: readonly number[]) {
   return a.filter((value) => b.includes(value));
}

function renderRow(props: ListChildComponentProps) {
   const { index, style } = props;

   return (
      <ListItem style={style} key={index} component="div" disablePadding>
         <ListItemButton>
            <ListItemText primary={`Item ${index + 1}`} />

            <Popover>
               <PopoverTrigger>edit</PopoverTrigger>
               <PopoverContent className="w-80">
                  <div className="grid gap-4">
                     <div className="space-y-2">
                        <h4 className="font-medium leading-none">Name</h4>
                        <p className="text-sm text-muted-foreground">
                           Set/Edit category name and description.
                        </p>
                     </div>
                     <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                           <Label htmlFor="width">Name</Label>
                           <Input
                              id="width"
                              defaultValue="100%"
                              className="col-span-2 h-8"
                           />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                           <Label htmlFor="maxWidth">Description</Label>
                           <Input
                              id="maxWidth"
                              defaultValue="300px"
                              className="col-span-2 h-8"
                           />
                        </div>
                     </div>
                     <div className="flex mt-5 ml-auto gap-5">
                        <SButton className="" type="submit">
                           Delete
                        </SButton>
                        <SButton className="" type="submit">
                           Save changes
                        </SButton>
                     </div>
                  </div>
               </PopoverContent>
            </Popover>
         </ListItemButton>
      </ListItem>
   );
}

export default function CategoryItem() {
   const [checked, setChecked] = useState<readonly number[]>([]);
   const [left, setLeft] = useState<readonly number[]>([0, 1, 2, 3]);
   const [right, setRight] = useState<readonly number[]>([4, 5, 6, 7]);

   const leftChecked = intersection(checked, left);
   const rightChecked = intersection(checked, right);

   const handleToggle = (value: number) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

      if (currentIndex === -1) {
         newChecked.push(value);
      } else {
         newChecked.splice(currentIndex, 1);
      }

      setChecked(newChecked);
   };

   const handleAllRight = () => {
      setRight(right.concat(left));
      setLeft([]);
   };

   const handleCheckedRight = () => {
      setRight(right.concat(leftChecked));
      setLeft(not(left, leftChecked));
      setChecked(not(checked, leftChecked));
   };

   const handleCheckedLeft = () => {
      setLeft(left.concat(rightChecked));
      setRight(not(right, rightChecked));
      setChecked(not(checked, rightChecked));
   };

   const handleAllLeft = () => {
      setLeft(left.concat(right));
      setRight([]);
   };

   const customList = (items: readonly number[]) => (
      <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
         <List dense component="div" role="list">
            {items.map((value: number) => {
               const labelId = `transfer-list-item-${value}-label`;

               return (
                  <ListItemButton
                     key={value}
                     role="listitem"
                     onClick={handleToggle(value)}
                  >
                     <ListItemIcon>
                        <Checkbox
                           checked={checked.includes(value)}
                           tabIndex={-1}
                           disableRipple
                           inputProps={{
                              'aria-labelledby': labelId,
                           }}
                        />
                     </ListItemIcon>
                     <ListItemText
                        id={labelId}
                        primary={`List item ${value + 1}`}
                     />
                  </ListItemButton>
               );
            })}
         </List>
      </Paper>
   );

   return (
      <div>
         <div className="w-fit">
            <Card className="w-[400px]">
               <CardHeader>
                  <CardTitle>Parent category name</CardTitle>
                  <CardDescription>
                     Deploy your new project in one-click.
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <Box
                     sx={{
                        width: '100%',
                        height: 400,
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                     }}
                  >
                     <FixedSizeList
                        height={400}
                        width={360}
                        itemSize={46}
                        itemCount={10}
                        overscanCount={5}
                     >
                        {renderRow}
                     </FixedSizeList>
                  </Box>
               </CardContent>

               <CardFooter className="flex justify-between">
                  <Dialog>
                     <DialogTrigger>Edit</DialogTrigger>
                     <DialogContent className="w-fit">
                        <DialogHeader>
                           <DialogTitle>Edit root category</DialogTitle>
                           <DialogDescription>
                              Choose non-parent categories to display in the
                              root category.
                           </DialogDescription>
                        </DialogHeader>

                        <Grid
                           container
                           spacing={2}
                           sx={{
                              justifyContent: 'center',
                              alignItems: 'center',
                           }}
                        >
                           <Grid item>{customList(left)}</Grid>
                           <Grid item>
                              <Grid
                                 container
                                 direction="column"
                                 sx={{ alignItems: 'center' }}
                              >
                                 <SButton
                                    variant="outline"
                                    size="sm"
                                    onClick={handleAllRight}
                                    disabled={left.length === 0}
                                    aria-label="move all right"
                                 >
                                    ≫
                                 </SButton>
                                 <SButton
                                    variant="outline"
                                    size="sm"
                                    onClick={handleCheckedRight}
                                    disabled={leftChecked.length === 0}
                                    aria-label="move selected right"
                                 >
                                    &gt;
                                 </SButton>
                                 <SButton
                                    variant="outline"
                                    size="sm"
                                    onClick={handleCheckedLeft}
                                    disabled={rightChecked.length === 0}
                                    aria-label="move selected left"
                                 >
                                    &lt;
                                 </SButton>
                                 <SButton
                                    variant="outline"
                                    size="sm"
                                    onClick={handleAllLeft}
                                    disabled={right.length === 0}
                                    aria-label="move all left"
                                 >
                                    ≪
                                 </SButton>
                              </Grid>
                           </Grid>
                           <Grid item>{customList(right)}</Grid>
                        </Grid>

                        <DialogFooter>
                           <SButton type="submit">Save changes</SButton>
                        </DialogFooter>
                     </DialogContent>
                  </Dialog>
               </CardFooter>
            </Card>
         </div>
      </div>
   );
}
