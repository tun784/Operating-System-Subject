#include <stdio.h>
#include <sys/types.h>
#include <unistd.h>

int main(){
    int pid;
    int i = 0;
    printf("hi ");
    pid = fork();
    //fork();
    printf("Hello ");
    printf("Bye ");
    return 0;
}