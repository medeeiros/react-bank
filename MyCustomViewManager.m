//
//  MyCustomViewManager.m
//  backbase
//
//  Created by Guilherme Medeiros on 31/05/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import "MyCustomView.h"
#import "MyCustomViewManager.h"
#import <UIKit/UIKit.h>

@implementation MyCustomViewManager

RCT_EXPORT_MODULE()

-(UIView *)view
{
  MyCustomView *theView;
  theView = [[MyCustomView alloc] init];
  
  
  return theView;
}

@end
